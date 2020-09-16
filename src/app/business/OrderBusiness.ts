import OrderRepository from "../repository/OrderRepository";
import ServiceRepository from "../repository/ServiceRepository";
import UserRepository from "../repository/UserRepository";
import IOrderBusiness = require("./interfaces/OrderBusiness");
import { IOrder, OrderStatus } from "../models/interfaces";
import { Result } from "../../utils/Result";
import { generateInvoiceNo } from "../../utils/lib/Helper";
import { PaymentGatewayResponse } from "../../utils/payments/payer";
import {
  PaymentProcessorStatus,
  PaymentProcessor,
} from "../../utils/payments/PaymentFactory";
import { SettlementHandler } from "../../utils/payments/settlementHandler";
import { isAfter, isPast } from "date-fns";

class OrderBusiness implements IOrderBusiness {
  private _orderRepository: OrderRepository;
  private _serviceRepository: ServiceRepository;
  private _userRepository: UserRepository;

  constructor() {
    this._orderRepository = new OrderRepository();
    this._serviceRepository = new ServiceRepository();
    this._userRepository = new UserRepository();
  }

  async fetch(condition: any): Promise<Result<IOrder[]>> {
    const orders = await this._orderRepository.fetch(condition);
    return Result.ok<IOrder[]>(200, orders);
  }

  async findById(id: string): Promise<Result<IOrder>> {
    if (!id) return Result.fail<IOrder>(400, "Bad request");
    const order = await this._orderRepository.findById(id);
    if (!order) return Result.fail<IOrder>(404, `Order of Id ${id} not found`);
    return Result.ok<IOrder>(200, order);
  }

  async findOne(condition: any): Promise<Result<IOrder>> {
    if (!condition) return Result.fail<IOrder>(400, "Bad request");
    const order = await this._orderRepository.findByOne(condition);
    if (!order) return Result.fail<IOrder>(404, `Order not found`);
    return Result.ok<IOrder>(200, order);
  }

  async findByCriteria(criteria: any): Promise<Result<IOrder>> {
    const order = await this._orderRepository.findByCriteria(criteria);
    if (!order) return Result.fail<IOrder>(404, `Order not found`);
    return Result.ok<IOrder>(200, order);
  }

  async create(item: IOrder): Promise<Result<IOrder>> {
    const service = await this._serviceRepository.findById(item.service);
    if (!service) return Result.fail<IOrder>(404, "Service not found");
    if (item.order.quantity < 1)
      return Result.fail<IOrder>(
        400,
        "Please provide at least 1 item in order"
      );
    const processors: string[] = Object.values(PaymentProcessor);
    if (!processors.includes(item.processor))
      return Result.fail<IOrder>(400, "Invalid Payment processor");
    if (item.order.items.length < 1)
      return Result.fail<IOrder>(400, "Please provide at least 1 order item");
    if (item.order.amount < 1)
      return Result.fail<IOrder>(400, "Please provide valid order amount");
    const calculatedAmount =
      service.price + item.order.amount * item.order.quantity;
    if (calculatedAmount !== item.order.totalAmount)
      return Result.fail<IOrder>(400, "Invalid totalAmount");
    item.order.orderNumber = generateInvoiceNo();
    item.order.isDiscountApplied = false;
    item.order.isSurchargeApplied = false;
    item.order.discountAmountApplied = 0;
    item.order.surchargeAmountAplied = 0;
    item.order.orderStatus = OrderStatus.Created;
    const newOrder = await this._orderRepository.create(item);
    return Result.ok<IOrder>(201, newOrder);
  }

  async updatePayment(
    processorResponse: PaymentGatewayResponse,
    orderId: string
  ): Promise<Result<IOrder>> {
    const orderObj = await this._orderRepository.findById(orderId);
    if (!orderObj) return Result.fail<IOrder>(404, "Order not found");

    if (orderObj.order.orderStatus === OrderStatus.Successful)
      return Result.fail<IOrder>(404, "Order has already been completed");

    let transactionDate =
      processorResponse !== null
        ? new Date(processorResponse.gatewayReponse).getTime()
        : 0;
    if (isPast(transactionDate))
      return Result.fail<IOrder>(400, "Invalid transaction");

    if (processorResponse.amount !== processorResponse.requestedAmount)
      return Result.fail<IOrder>(400, "Invalid transaction amount");

    var user = await this._userRepository.findByCriteria({
      email: processorResponse.customerId,
    });

    if (!user) return Result.fail<IOrder>(404, "Customer not found");

    if (user._id.toString() != orderObj.order.user.toString())
      return Result.fail<IOrder>(400, "Invalid customer transaction");

    orderObj.referencenNo = processorResponse.reference;

    if (processorResponse.requestStatus) {
      // the request was successful, might be success, failed or abandone
      if (
        PaymentProcessorStatus[processorResponse.status] ===
        PaymentProcessorStatus.success
      ) {
        // payment was successful
        // check amountPaid with orderTotalAmount
        if (processorResponse.amount === orderObj.order.totalAmount) {
          const additionalInfo = {
            additionalInfo: processorResponse.gatewayReponse,
            channel: processorResponse.channel,
            ipAddress: processorResponse.ipAddress,
          };
          orderObj.additionalInfo = JSON.stringify(additionalInfo);
          orderObj.order.orderStatus = OrderStatus.Successful;
          orderObj.order.paymentDate = processorResponse.transactionDate;
          orderObj.updateAt = new Date();
          const updateObj = await this._orderRepository.update(
            orderObj._id,
            orderObj
          );

          // settlement starts here
          const service = await this._serviceRepository.findById(
            orderObj.service
          );
          var settlement = SettlementHandler.initialize();
          settlement.process(orderObj.order.items[0], service.type);
          // settlement ends here

          return Result.ok<IOrder>(200, updateObj);
        } else {
          // invalid amount, do not give value
          const additionalInfo = {
            additionalInfo: processorResponse.gatewayReponse,
            channel: processorResponse.channel,
            ipAddress: processorResponse.ipAddress,
          };
          orderObj.additionalInfo = JSON.stringify(additionalInfo);
          orderObj.order.orderStatus = OrderStatus.Failed;
          orderObj.order.paymentDate = processorResponse.transactionDate;
          orderObj.order.error = "Invalid amount paid";
          orderObj.updateAt = new Date();
          await this._orderRepository.update(orderObj._id, orderObj);
          return Result.fail<IOrder>(400, "Invalid amount paid");
        }
      } else {
        // payment gateway processed successfully but transaction failed
        const additionalInfo = {
          additionalInfo: processorResponse.gatewayReponse,
          channel: processorResponse.channel,
          ipAddress: processorResponse.ipAddress,
        };
        orderObj.additionalInfo = JSON.stringify(additionalInfo);
        orderObj.order.orderStatus = OrderStatus.Failed;
        orderObj.order.paymentDate = processorResponse.transactionDate;
        orderObj.order.error = processorResponse.gatewayReponse;
        orderObj.updateAt = new Date();
        await this._orderRepository.update(orderObj._id, orderObj);
        return Result.fail<IOrder>(400, processorResponse.gatewayReponse);
      }
    } else {
      // other error occured;
      const additionalInfo = {
        additionalInfo: processorResponse.gatewayReponse,
      };
      orderObj.additionalInfo = JSON.stringify(additionalInfo);
      orderObj.order.orderStatus = OrderStatus.Failed;
      orderObj.order.paymentDate = processorResponse.transactionDate;
      orderObj.order.error = processorResponse.gatewayReponse;
      orderObj.updateAt = new Date();
      await this._orderRepository.update(orderObj._id, orderObj);
      return Result.fail<IOrder>(400, "Payment failed");
    }
  }

  async update(id: string, item: IOrder): Promise<Result<IOrder>> {
    const order = await this._orderRepository.findById(id);
    if (!order)
      return Result.fail<IOrder>(
        404,
        `Could not update order.Order with Id ${id} not found`
      );
    const updateObj = await this._orderRepository.update(order._id, item);
    return Result.ok<IOrder>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._orderRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(OrderBusiness);
export = OrderBusiness;

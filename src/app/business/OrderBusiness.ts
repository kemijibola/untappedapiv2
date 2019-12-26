import OrderRepository from "../repository/OrderRepository";
import IOrderBusiness = require("./interfaces/OrderBusiness");
import { IOrder } from "../models/interfaces";
import { Result } from "../../utils/Result";

class OrderBusiness implements IOrderBusiness {
  private _orderRepository: OrderRepository;

  constructor() {
    this._orderRepository = new OrderRepository();
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
    const newOrder = await this._orderRepository.create(item);
    // TODO:: Create approval request
    return Result.ok<IOrder>(201, newOrder);
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

import PaymentRepository from "../repository/PaymentRepository";
import IPaymentBusiness = require("./interfaces/PaymentBusiness");
import { IPayment } from "../models/interfaces";
import { Result } from "../../utils/Result";

class PaymentBusiness implements IPaymentBusiness {
  private _paymentRepository: PaymentRepository;

  constructor() {
    this._paymentRepository = new PaymentRepository();
  }

  async fetch(condition: any): Promise<Result<IPayment[]>> {
    const payments = await this._paymentRepository.fetch(condition);
    return Result.ok<IPayment[]>(200, payments);
  }

  async findById(id: string): Promise<Result<IPayment>> {
    if (!id) return Result.fail<IPayment>(400, "Bad request");
    const payment = await this._paymentRepository.findById(id);
    if (!payment)
      return Result.fail<IPayment>(404, `Payment of Id ${id} not found`);
    return Result.ok<IPayment>(200, payment);
  }

  async findOne(condition: any): Promise<Result<IPayment>> {
    if (!condition) return Result.fail<IPayment>(400, "Bad request");
    const payment = await this._paymentRepository.findByOne(condition);
    if (!payment) return Result.fail<IPayment>(404, `Payment not found`);
    return Result.ok<IPayment>(200, payment);
  }

  async findByCriteria(criteria: any): Promise<Result<IPayment>> {
    const payment = await this._paymentRepository.findByCriteria(criteria);
    if (!payment) return Result.fail<IPayment>(404, `Payment not found`);
    return Result.ok<IPayment>(200, payment);
  }

  async create(item: IPayment): Promise<Result<IPayment>> {
    const newPayment = await this._paymentRepository.create(item);
    // TODO:: Create approval request
    return Result.ok<IPayment>(201, newPayment);
  }

  async update(id: string, item: IPayment): Promise<Result<IPayment>> {
    const payment = await this._paymentRepository.findById(id);
    if (!payment)
      return Result.fail<IPayment>(
        404,
        `Could not update payment.Payment with Id ${id} not found`
      );
    const updateObj = await this._paymentRepository.update(payment._id, item);
    return Result.ok<IPayment>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._paymentRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(PaymentBusiness);
export = PaymentBusiness;

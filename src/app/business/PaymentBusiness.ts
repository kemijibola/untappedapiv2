import PaymentRepository from '../repository/PaymentRepository';
import IPaymentBusiness = require('./interfaces/PaymentBusiness');
import { IPayment } from '../models/interfaces';
import { Result } from '../../utils/Result';

class PaymentBusiness implements IPaymentBusiness {
  private _paymentRepository: PaymentRepository;

  constructor() {
    this._paymentRepository = new PaymentRepository();
  }

  async fetch(condition: any): Promise<Result<IPayment[]>> {
    try {
      const payments = await this._paymentRepository.fetch(condition);
      return Result.ok<IPayment[]>(200, payments);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IPayment>> {
    try {
      if (!id) return Result.fail<IPayment>(400, 'Bad request');
      const payment = await this._paymentRepository.findById(id);
      if (!payment)
        return Result.fail<IPayment>(404, `Payment of Id ${id} not found`);
      else return Result.ok<IPayment>(200, payment);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findOne(condition: any): Promise<Result<IPayment>> {
    try {
      if (!condition) return Result.fail<IPayment>(400, 'Bad request');
      const payment = await this._paymentRepository.findByOne(condition);
      if (!payment) return Result.fail<IPayment>(404, `Payment not found`);
      else return Result.ok<IPayment>(200, payment);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IPayment>> {
    try {
      const payment = await this._paymentRepository.findByCriteria(criteria);
      if (!payment) return Result.fail<IPayment>(404, `Payment not found`);
      else return Result.ok<IPayment>(200, payment);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: IPayment): Promise<Result<IPayment>> {
    try {
      const newPayment = await this._paymentRepository.create(item);
      // TODO:: Create approval request
      return Result.ok<IPayment>(201, newPayment);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(id: string, item: IPayment): Promise<Result<IPayment>> {
    try {
      const payment = await this._paymentRepository.findById(id);
      if (!payment)
        return Result.fail<IPayment>(
          404,
          `Could not update payment.Payment with Id ${id} not found`
        );
      const updateObj = await this._paymentRepository.update(payment._id, item);
      return Result.ok<IPayment>(200, updateObj);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._paymentRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(PaymentBusiness);
export = PaymentBusiness;

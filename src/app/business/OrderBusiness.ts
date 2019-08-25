import OrderRepository from '../repository/OrderRepository';
import IOrderBusiness = require('./interfaces/OrderBusiness');
import { IOrder } from '../models/interfaces';
import { Result } from '../../utils/Result';

class OrderBusiness implements IOrderBusiness {
  private _orderRepository: OrderRepository;

  constructor() {
    this._orderRepository = new OrderRepository();
  }

  async fetch(condition: any): Promise<Result<IOrder[]>> {
    try {
      const orders = await this._orderRepository.fetch(condition);
      return Result.ok<IOrder[]>(200, orders);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IOrder>> {
    try {
      if (!id) return Result.fail<IOrder>(400, 'Bad request');
      const order = await this._orderRepository.findById(id);
      if (!order)
        return Result.fail<IOrder>(404, `Order of Id ${id} not found`);
      else return Result.ok<IOrder>(200, order);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findOne(condition: any): Promise<Result<IOrder>> {
    try {
      if (!condition) return Result.fail<IOrder>(400, 'Bad request');
      const order = await this._orderRepository.findByOne(condition);
      if (!order) return Result.fail<IOrder>(404, `Order not found`);
      else return Result.ok<IOrder>(200, order);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IOrder>> {
    try {
      const order = await this._orderRepository.findByCriteria(criteria);
      if (!order) return Result.fail<IOrder>(404, `Order not found`);
      else return Result.ok<IOrder>(200, order);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: IOrder): Promise<Result<IOrder>> {
    try {
      const newOrder = await this._orderRepository.create(item);
      // TODO:: Create approval request
      return Result.ok<IOrder>(201, newOrder);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(id: string, item: IOrder): Promise<Result<IOrder>> {
    try {
      const order = await this._orderRepository.findById(id);
      if (!order)
        return Result.fail<IOrder>(
          404,
          `Could not update order.Order with Id ${id} not found`
        );
      const updateObj = await this._orderRepository.update(order._id, item);
      return Result.ok<IOrder>(200, updateObj);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._orderRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(OrderBusiness);
export = OrderBusiness;

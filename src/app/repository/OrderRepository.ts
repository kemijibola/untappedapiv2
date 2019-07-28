import { IOrder } from '../models/interfaces';
import { OrderSchema } from '../data/schema/Order';
import RepositoryBase from './base/RepositoryBase';

class OrderRepository extends RepositoryBase<IOrder> {
  constructor() {
    super(OrderSchema);
  }
}

Object.seal(OrderRepository);
export = OrderRepository;

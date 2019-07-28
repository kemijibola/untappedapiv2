import BaseBusiness from './base/BaseBusiness';
import { IOrder } from '../../models/interfaces';

interface OrderBusiness extends BaseBusiness<IOrder> {}
export = OrderBusiness;

import BaseBusiness from './base/BaseBusiness';
import { IPayment } from '../../models/interfaces';

interface PaymentBusiness extends BaseBusiness<IPayment> {}
export = PaymentBusiness;

import { IPayment } from '../models/interfaces';
import { PaymentSchema } from '../data/schema/Payment';
import RepositoryBase from './base/RepositoryBase';

class PaymentRepository extends RepositoryBase<IPayment> {
  constructor() {
    super(PaymentSchema);
  }
}

Object.seal(PaymentRepository);
export = PaymentRepository;

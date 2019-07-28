import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import {
  IPayment,
  PaymentChannel,
  PaymentStatus
} from '../../models/interfaces';

const paymentSchema: Schema = new Schema(
  {
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    amountPaid: { type: Number, required: true },
    paymentChannel: { type: PaymentChannel, required: true },
    status: { type: PaymentStatus, default: PaymentStatus.UnPaid },
    errorMessage: { type: String },
    transactionDate: { type: Date },
    application: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    }
  },
  { timestamps: true }
);

export const PaymentSchema = mongooseConnection.model<IPayment>(
  'Payment',
  paymentSchema
);

import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IOrder, ServiceType } from '../../models/interfaces';

const orderDetailsSchema: Schema = new Schema({
  amount: { type: Number, required: true },
  isDiscountApplied: { type: Boolean, default: false },
  discountAmountApplied: { type: Number },
  totalAmount: { type: Number, required: true },
  quantity: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: String, required: true }]
});

const orderSchema: Schema = new Schema(
  {
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    orderNumber: { type: String },
    order: { type: orderDetailsSchema, required: true },
    application: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    }
  },
  { timestamps: true }
);

export const OrderSchema = mongooseConnection.model<IOrder>(
  'Order',
  orderSchema
);

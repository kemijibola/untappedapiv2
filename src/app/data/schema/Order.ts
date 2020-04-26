import MongodataAccess = require("../MongodataAccess");
import { Schema } from "mongoose";
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IOrder, ServiceType, OrderStatus } from "../../models/interfaces";
import { PaymentProcessor } from "../../../utils/payments/PaymentFactory";

const orderDetailsSchema: Schema = new Schema({
  amount: { type: Number, required: true },
  orderNumber: { type: String, required: true },
  isDiscountApplied: { type: Boolean, default: false },
  discountAmountApplied: { type: Number, default: 0 },
  isSurchargeApplied: { type: Boolean, default: false },
  surchargeAmountAplied: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  quantity: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ type: String, required: true }],
  orderStatus: { type: OrderStatus, default: OrderStatus.Pending },
  paymentDate: { type: Date },
  error: { type: String },
});

const orderSchema: Schema = new Schema(
  {
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    referencenNo: { type: String },
    processor: { type: PaymentProcessor, required: true },
    order: { type: orderDetailsSchema, required: true },
    additionalInfo: { type: String },
    application: {
      type: Schema.Types.ObjectId,
      ref: "Application",
    },
  },
  { timestamps: true }
);

export const OrderSchema = mongooseConnection.model<IOrder>(
  "Order",
  orderSchema
);

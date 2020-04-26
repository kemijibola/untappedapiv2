import { PaymentProcessor } from "./../../../utils/payments/PaymentFactory";
import mongoose from "mongoose";
import { ITimeStamp } from "./Timestamp";
import { IService } from "./Service";
import { IUser } from "./User";
import { IAppSpec } from "./AppSpec";

export interface OrderDetails {
  amount: number;
  orderNumber: string;
  items: string[];
  isDiscountApplied: boolean;
  isSurchargeApplied: boolean;
  discountAmountApplied: number;
  surchargeAmountAplied: number;
  totalAmount: number;
  quantity: number;
  user: IUser["_id"];
  orderStatus: OrderStatus;
  paymentDate?: Date;
  error?: string;
}

export interface IOrder extends ITimeStamp, IAppSpec, mongoose.Document {
  service: IService["_id"];
  referencenNo?: string;
  processor: PaymentProcessor;
  additionalInfo: string;
  order: OrderDetails;
}

export enum OrderStatus {
  Created = "created",
  Successful = "successful",
  Failed = "failed",
  Pending = "pending",
}

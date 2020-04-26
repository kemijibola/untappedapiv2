import mongoose from "mongoose";
import { ITimeStamp } from "./Timestamp";
import { IService } from "./Service";
import { IOrder } from "./Order";
import { IAppSpec } from "./AppSpec";

export enum PaymentChannel {
  PayStack = "PayStack",
  InterSwitch = "InterSwitch",
  Cash = "Cash",
}

export enum PaymentStatus {
  Completed = "Completed",
  UnPaid = "UnPaid",
}

export interface IPayment extends ITimeStamp, IAppSpec, mongoose.Document {
  order: IOrder["_id"];
  amountPaid: number;
  paymentChannel: PaymentChannel;
  status: PaymentStatus;
  errorMessage: string;
  transactionDate: Date;
}

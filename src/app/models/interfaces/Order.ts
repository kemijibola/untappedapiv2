import mongoose from "mongoose";
import { ITimeStamp } from "./Timestamp";
import { IService } from "./Service";
import { IUser } from "./User";
import { ServiceType } from "./Payment";
import { IAppSpec } from "./AppSpec";

export interface OrderDetails {
  amount: number;
  isDiscountApplied: boolean;
  discountAmountApplied: number;
  totalAmount: number;
  quantity: number;
  // purchased by user
  user: IUser["_id"];
  // the id of the item about to purchase. e.g contestId, talentId
  items: string[];
  dateCreated: Date;
}

export interface IOrder extends ITimeStamp, IAppSpec, mongoose.Document {
  // serviceType: ServiceType;
  service: IService["_id"];
  referenceNumber: string;
  order: OrderDetails;
}

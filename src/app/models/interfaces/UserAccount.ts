import mongoose from "mongoose";
import { ITimeStamp } from "./Timestamp";
import { IAppSpec } from "./AppSpec";
import { IUser } from "./User";

export interface IUserAccount extends ITimeStamp, IAppSpec, mongoose.Document {
  user: IUser["_id"];
  bankId: number;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  currency: string;
  accountName: string;
  gatewayRecipientCode?: string;
}

import mongoose from "mongoose";
import { ITimeStamp } from "./Timestamp";
import { IAppSpec } from "./AppSpec";
import { IUser } from "./User";
import { TransctionType } from "./custom/TransactionDTO";

export interface TransactionRequest
  extends ITimeStamp,
    IAppSpec,
    mongoose.Document {
  user: IUser["_id"];
  collectionAccount: string;
  amount: number;
  paymentReference: string;
  externalReference: string;
  narration: string;
  paymentChannel: string;
  transactionType: TransctionType;
  transferCode: string;
  responseCode: number;
  responseMessage: string;
  currency: string;
  transactionDate: Date;
  transactionStatus: string;
  responseBody?: string;
}

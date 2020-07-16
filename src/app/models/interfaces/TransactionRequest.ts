import mongoose from "mongoose";
import { ITimeStamp } from "./Timestamp";
import { IAppSpec } from "./AppSpec";

export interface TransactionRequest
  extends ITimeStamp,
    IAppSpec,
    mongoose.Document {
  providerId: string;
  amount: number;
  narration: string;
  requestType: string;
  responseStatus: string;
  responseMessage: string;
  transactionDate: Date;
}

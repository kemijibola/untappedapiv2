import { TransctionType } from "./custom/TransactionDTO";
import mongoose from "mongoose";
import { ITimeStamp } from "./Timestamp";
import { IAppSpec } from "./AppSpec";

export interface WalletTransaction
  extends ITimeStamp,
    IAppSpec,
    mongoose.Document {
  walletId: string;
  requestId: string;
  amount: number;
  narration: string;
  date: string;
  transactionType: TransctionType;
}

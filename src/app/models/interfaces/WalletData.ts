import { TransctionType, PaymentProviderStatus } from "./custom/TransactionDTO";
import mongoose from "mongoose";
import { ITimeStamp } from "./Timestamp";
import { IAppSpec } from "./AppSpec";
import { IUser } from "./User";

export interface WalletData extends ITimeStamp, IAppSpec, mongoose.Document {
  walletNumber: string;
  user: IUser["_id"];
  pin: string;
  status: PaymentProviderStatus;
  balance: Number;
}

export interface WalletViewModel {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  walletNmber: string;
  balance: number;
  status: string;
}

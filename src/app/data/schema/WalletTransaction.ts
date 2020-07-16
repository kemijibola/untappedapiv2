import MongodataAccess = require("../MongodataAccess");
import { Schema } from "mongoose";
const mongooseConnection = MongodataAccess.mongooseConnection;
import { WalletTransaction } from "../../models/interfaces";
import {
  TransctionType,
} from "../../models/interfaces/custom/TransactionDTO";

const walletDataSchema: Schema = new Schema(
  {
    walletId: {
      type: Schema.Types.ObjectId,
      ref: "WalletData",
      required: true,
    },
    requestId: {
      type: Schema.Types.ObjectId,
      ref: "TransactionRequest",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    narration: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    transactionType: {
      type: TransctionType,
    },
  },
  { timestamps: true }
);

export const WalletTransactionSchema = mongooseConnection.model<
  WalletTransaction
>("WalletTransaction", walletDataSchema);

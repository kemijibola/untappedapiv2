import MongodataAccess = require("../MongodataAccess");
import { Schema } from "mongoose";
const mongooseConnection = MongodataAccess.mongooseConnection;
import { WalletTransaction, PaymentChannel } from "../../models/interfaces";
import {
  TransctionType,
  TransactionStatus,
} from "../../models/interfaces/custom/TransactionDTO";

const walletDataSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reference: {
      type: Number,
    },
    paymentChannel: {
      type: PaymentChannel,
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
    responseCode: {
      type: String,
    },
    responseMessage: {
      type: String,
    },
    status: {
      type: TransactionStatus,
      required: true,
    },
  },
  { timestamps: true }
);

export const WalletTransactionSchema = mongooseConnection.model<
  WalletTransaction
>("WalletTransaction", walletDataSchema);

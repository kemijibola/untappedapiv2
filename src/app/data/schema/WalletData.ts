import MongodataAccess = require("../MongodataAccess");
import { Schema } from "mongoose";
const mongooseConnection = MongodataAccess.mongooseConnection;
import { WalletData } from "../../models/interfaces";
import { PaymentProviderStatus } from "../../models/interfaces/custom/TransactionDTO";

const walletDataSchema: Schema = new Schema(
  {
    walletNumber: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pin: {
      type: String,
      required: true,
    },
    status: {
      type: PaymentProviderStatus,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const WalletDataSchema = mongooseConnection.model<WalletData>(
  "WalletData",
  walletDataSchema
);

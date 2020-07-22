import MongodataAccess = require("../MongodataAccess");
import { Schema } from "mongoose";
const mongooseConnection = MongodataAccess.mongooseConnection;
import { TransactionRequest, PaymentChannel } from "../../models/interfaces";
import { TransctionType } from "../../models/interfaces/custom/TransactionDTO";

const transactionRequestSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    reference: {
      type: String,
    },
    narration: {
      type: String,
    },
    paymentChannel: {
      type: PaymentChannel,
      required: true,
    },
    transactionType: {
      type: TransctionType,
      required: true,
    },
    responseCode: {
      type: String,
    },
    responseMessage: {
      type: String,
    },
    transactionDate: {
      type: String,
    },
    application: {
      type: Schema.Types.ObjectId,
      ref: "Application",
    },
  },
  { timestamps: true }
);

export const TransactionRequestSchema = mongooseConnection.model<
  TransactionRequest
>("TransactionRequest", transactionRequestSchema);

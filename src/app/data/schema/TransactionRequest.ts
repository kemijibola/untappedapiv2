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
    paymentReference: {
      type: String,
    },
    externalReference: {
      type: String,
    },
    narration: {
      type: String,
    },
    paymentChannel: {
      type: String,
      required: true,
    },
    transactionType: {
      type: TransctionType,
      required: true,
    },
    transferCode: {
      type: String,
    },
    responseCode: {
      type: Number,
    },
    responseMessage: {
      type: String,
    },
    currency: {
      type: String,
      required: true,
    },
    transactionDate: {
      type: Date,
    },
    transactionStatus: {
      type: String,
    },
    responseBody: {
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

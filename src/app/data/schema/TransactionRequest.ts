import MongodataAccess = require("../MongodataAccess");
import { Schema } from "mongoose";
const mongooseConnection = MongodataAccess.mongooseConnection;
import { TransactionRequest } from "../../models/interfaces";

const transactionRequestSchema: Schema = new Schema(
  {
    providerId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    narration: {
      type: String,
    },
    requestType: {
      type: String,
      required: true,
    },
    responseStatus: {
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

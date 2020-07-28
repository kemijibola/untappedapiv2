import MongodataAccess = require("../MongodataAccess");
import { Schema } from "mongoose";
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IUserAccount } from "../../models/interfaces";

const userAccountSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    accountName: {
      type: String,
      required: true,
    },
    bankId: {
      type: Number,
    },
    bankName: {
      type: String,
      required: true,
    },
    bankCode: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
    },
    gatewayRecipientCode: {
      type: String,
    },
    application: {
      type: Schema.Types.ObjectId,
      ref: "Application",
    },
  },
  { timestamps: true }
);

export const UserAccountSchema = mongooseConnection.model<IUserAccount>(
  "UserAccount",
  userAccountSchema
);

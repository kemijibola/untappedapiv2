import MongodataAccess = require("../MongodataAccess");
import { Schema } from "mongoose";
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IRefreshToken } from "../../models/interfaces";

const refreshTokenSchema: Schema = new Schema(
  {
    token: { type: String, required: true },
    ownerId: { type: String, required: true },
    isExpired: { type: Boolean, default: false },
    application: {
      type: Schema.Types.ObjectId,
      ref: "Application",
      required: true
    }
  },
  { timestamps: true }
);
export const RefreshTokenSchema = mongooseConnection.model<IRefreshToken>(
  "RefreshToken",
  refreshTokenSchema
);

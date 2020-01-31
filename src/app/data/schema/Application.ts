import MongodataAccess = require("../MongodataAccess");
import { Schema } from "mongoose";
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IApplication } from "../../models/interfaces";

const applicationSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    dbUri: { type: String },
    audience: { type: String, required: true },
    clientId: { type: String, required: true },
    refreshTokenExpiresIn: { type: Number, default: 0 },
    emailConfirmationRedirectUrl: { type: String, required: true },
    redirectBaseUrl: { type: String },
    clientSecret: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
    approvedDate: { type: Date }
  },
  { timestamps: true }
);

export const ApplicationSchema = mongooseConnection.model<IApplication>(
  "Application",
  applicationSchema
);

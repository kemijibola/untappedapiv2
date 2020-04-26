import MongodataAccess = require("../MongodataAccess");
import { Schema } from "mongoose";
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IService, ServiceType } from "../../models/interfaces";

const serviceSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: ServiceType,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    vat: {
      type: Number,
    },
    active: {
      type: Boolean,
      default: false,
    },
    surchargeFee: {
      type: Number,
    },
    description: {
      type: String,
    },
    application: {
      type: Schema.Types.ObjectId,
      ref: "Application",
    },
  },
  { timestamps: true }
);

export const ServiceSchema = mongooseConnection.model<IService>(
  "Service",
  serviceSchema
);

import MongodataAccess = require("../MongodataAccess");
import { Schema } from "mongoose";
const mongooseConnection = MongodataAccess.mongooseConnection;
import { ICategoryType } from "../../models/interfaces";

const categoryTypeSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true
    }
  },
  { timestamps: true }
);

export const CategoryTypeSchema = mongooseConnection.model<ICategoryType>(
  "CategoryType",
  categoryTypeSchema
);

import MongodataAccess = require("../MongodataAccess");
import { Schema } from "mongoose";
import {
  IUserFilterCategory,
  ReportType
} from "../../models/interfaces/UserFilterCategory";
const mongooseConnection = MongodataAccess.mongooseConnection;

// const filterCategorySchema = new Schema({
//   userId: { path: Schema.Types.ObjectId, ref: "User", required: true },
//   stageName: { type: String, required: true },
//   profileImage: { type: String },
//   shortBio: { type: String, required: true }
// });

const userFilterCategorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  displayPhoto: { type: String, required: true },
  displayName: { type: String, required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  shortDescription: { type: String, required: true },
  reportType: { type: ReportType, required: true },
  userType: { type: String, required: true }
});

export const UserFilterCategorySchema = mongooseConnection.model<
  IUserFilterCategory
>("UserFilterCategory", userFilterCategorySchema);

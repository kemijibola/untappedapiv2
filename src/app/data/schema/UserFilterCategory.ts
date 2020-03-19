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

const categoryTypeWithCategorySchema = new Schema({
  categoryTypeId: { type: String },
  categoryTypeName: { type: String },
  category: { type: String }
});
const userFilterCategorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  displayPhoto: { type: String, required: true },
  displayName: { type: String, required: true },
  categoryTypes: [{ type: categoryTypeWithCategorySchema, required: true }],
  shortDescription: { type: String, required: true },
  tapCount: { type: Number, default: 0 },
  contestCount: { type: Number, default: 0 },
  reportType: { type: ReportType, required: true },
  aliasName: { type: String, required: true },
  userType: { type: String, required: true },
  dateJoined: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const UserFilterCategorySchema = mongooseConnection.model<
  IUserFilterCategory
>("UserFilterCategory", userFilterCategorySchema);

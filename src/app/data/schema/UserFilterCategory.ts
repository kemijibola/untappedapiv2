import MongodataAccess = require("../MongodataAccess");
import { Schema } from "mongoose";
import {
  IUserFilterCategory,
  ReportType,
} from "../../models/interfaces/UserFilterCategory";
import { socialMediaSchema } from "./Profile";
const mongooseConnection = MongodataAccess.mongooseConnection;

// const filterCategorySchema = new Schema({
//   userId: { path: Schema.Types.ObjectId, ref: "User", required: true },
//   stageName: { type: String, required: true },
//   profileImage: { type: String },
//   shortBio: { type: String, required: true }
// });

const userContestListSchema = new Schema({
  contestId: { type: String },
  contestTitle: { type: String },
  contestBanner: { type: String },
  contestViewCount: { type: Number },
  contestLikedByCount: { type: Number },
  commentCount: { type: Number },
  entryCount: { type: Number },
});

const categoryTypeWithCategorySchema = new Schema({
  categoryTypeId: { type: String },
  categoryTypeName: { type: String },
  category: { type: String },
});

const userFilterCategorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  displayPhoto: { type: String, required: true },
  displayName: { type: String, required: true },
  categoryTypes: [{ type: categoryTypeWithCategorySchema, required: true }],
  location: { type: String },
  bannerPhoto: { type: String },
  shortDescription: { type: String, required: true },
  tapCount: { type: Number, default: 0 },
  tappedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  contestCount: { type: Number, default: 0 },
  socialMedias: [{ type: socialMediaSchema }],
  contests: [{ type: userContestListSchema }],
  reportType: { type: ReportType, required: true },
  aliasName: { type: String, required: true },
  userType: { type: String, required: true },
  dateJoined: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

userFilterCategorySchema.index(
  { aliasName: "text", displayName: "text" },
  { weights: { aliasName: 1, displayName: 2 } }
);

export const UserFilterCategorySchema = mongooseConnection.model<
  IUserFilterCategory
>("UserFilterCategory", userFilterCategorySchema);

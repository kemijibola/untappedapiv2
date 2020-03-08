import MongodataAccess = require("../MongodataAccess");
import { Schema } from "mongoose";
const mongooseConnection = MongodataAccess.mongooseConnection;
import {
  IMedia,
  MediaUploadType,
  MediaType
} from "../../models/interfaces/Media";

const mediaItemSchema = new Schema(
  {
    path: { type: String, required: true },
    likedBy: [{ type: String }],
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const mediaSchema = new Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [{ type: mediaItemSchema, required: true }],
    albumCover: { type: String },
    activityCount: { type: Number, default: 0 },
    uploadType: { type: MediaUploadType, required: true },
    mediaType: { type: MediaType, required: true },
    isApproved: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const MediaSchema = mongooseConnection.model<IMedia>(
  "Media",
  mediaSchema
);

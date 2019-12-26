import MongodataAccess = require("../MongodataAccess");
import { Schema } from "mongoose";
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IVideo, MediaUploadType } from "../../models/interfaces/Media";

const videoItemSchema = new Schema(
  {
    id: { type: String, required: true },
    path: { type: String, required: true },
    likedBy: [{ type: String }]
  },
  { timestamps: true }
);

const videoSchema = new Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [{ type: videoItemSchema, required: true }],
    albumCover: { type: String },
    uploadType: { type: MediaUploadType, required: true },
    activityCount: { type: Number, default: 0 },
    isApproved: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const VideoSchema = mongooseConnection.model<IVideo>(
  "Video",
  videoSchema
);

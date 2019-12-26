import MongodataAccess = require("../MongodataAccess");
import { Schema } from "mongoose";
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IAudio, MediaUploadType } from "../../models/interfaces/Media";

const audioItemSchema = new Schema(
  {
    id: { type: String, required: true },
    path: { type: String, required: true },
    likedBy: [{ type: String }]
  },
  { timestamps: true }
);

const audioSchema = new Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [{ type: audioItemSchema, required: true }],
    albumCover: { type: String },
    uploadType: { type: MediaUploadType, required: true },
    isApproved: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    activityCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const AudioSchema = mongooseConnection.model<IAudio>(
  "Audio",
  audioSchema
);

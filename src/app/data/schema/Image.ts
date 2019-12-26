import MongodataAccess = require("../MongodataAccess");
import { Schema } from "mongoose";
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IImage, MediaUploadType } from "../../models/interfaces/Media";

const imageItemSchema = new Schema(
  {
    id: { type: String, required: true },
    path: { type: String, required: true },
    likedBy: [{ type: String }]
  },
  { timestamps: true }
);

const imageSchema = new Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [{ type: imageItemSchema, required: true }],
    albumCover: { type: String },
    activityCount: { type: Number, default: 0 },
    uploadType: { type: MediaUploadType, required: true },
    isApproved: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const ImageSchema = mongooseConnection.model<IImage>(
  "Image",
  imageSchema
);

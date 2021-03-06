import MongodataAccess = require("../MongodataAccess");
import { Schema } from "mongoose";
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IProfile, SocialMediaTypes } from "../../models/interfaces";

export const socialMediaSchema: Schema = new Schema({
  type: { type: SocialMediaTypes },
  handle: { type: String },
});

export type ILocation = {
  location: string;
  formattedAddres: string;
};

const physicalStatisticsSchema: Schema = new Schema({
  height: { type: String },
  bodyType: { type: String },
  color: { type: String },
});

const profileSchema: Schema = new Schema(
  {
    name: { type: String },
    rcNumber: { type: String },
    location: { type: String },
    formattedAddres: { type: String },
    phoneNumbers: [{ type: String }],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shortBio: { type: String, minlength: 80, maxlength: 2500 },
    categoryTypes: [
      {
        type: Schema.Types.ObjectId,
        ref: "CategoryType",
        required: true,
      },
    ],
    tappedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    twitter: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    youtube: { type: String },
    additionalSocial: [{ type: String }],
    physicalStats: { type: physicalStatisticsSchema },
    tapCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ProfileSchema = mongooseConnection.model<IProfile>(
  "Profile",
  profileSchema
);

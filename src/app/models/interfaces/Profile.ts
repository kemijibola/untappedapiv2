import mongoose from "mongoose";
import { IUser, IUserModel } from "./User";
import { ICategory } from "./Category";
import { ITimeStamp } from "./Timestamp";
import { IAppSpec } from "./AppSpec";

export interface IPhysicalStatistics {
  height: string;
  bodyType: string;
  color: string;
}

export enum SocialMedia {
  FACEBOOK = "FACEBOOK",
  TWITTER = "TWITTER",
  INSTAGRAM = "INSTAGRAM",
  YOUTUBE = "YOUTUBE",
  OTHER = "OTHER"
}

export interface IUserSocialMedia {
  type: SocialMedia;
  handle: string;
}

export interface IProfile extends ITimeStamp, IAppSpec, mongoose.Document {
  name?: string;
  rcNumber?: string;
  location: string;
  phoneNumbers?: string[];
  tapCount: number;
  user?: IUserModel["_id"];
  shortBio?: string;
  categories?: ICategory["_id"][];
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  additionalSocial?: string[];
  physicalStats?: IPhysicalStatistics;
  bannerImagePath?: string;
}

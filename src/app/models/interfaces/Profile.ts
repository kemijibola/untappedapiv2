import mongoose from "mongoose";
import { IUser, IUserModel } from "./User";
import { ICategoryType } from "./CategoryType";
import { ITimeStamp } from "./Timestamp";
import { IAppSpec } from "./AppSpec";

export interface IPhysicalStatistics {
  height: string;
  bodyType: string;
  color: string;
}

export enum SocialMediaTypes {
  facebook = "facebook",
  twitter = "twitter",
  instagram = "instagram",
  youtube = "youtube",
}

export interface IUserSocialMedia {
  type: SocialMediaTypes;
  handle: string;
}

export interface IProfile extends ITimeStamp, IAppSpec, mongoose.Document {
  name?: string;
  rcNumber?: string;
  location: string;
  formattedAddres: string;
  phoneNumbers?: string[];
  tapCount: number;
  tappedBy: string[];
  user?: IUserModel["_id"];
  shortBio?: string;
  categoryTypes?: ICategoryType["_id"][];
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  additionalSocial?: string[];
  physicalStats?: IPhysicalStatistics;
}

export interface TalentProfile {
  talentId: string;
  talentName: string;
  emailConfirmed: boolean;
  portfolioApproved: boolean;
  shortBio: string;
  profilePicture: string
  phoneNumber: string;
  dateJoined: Date;
}

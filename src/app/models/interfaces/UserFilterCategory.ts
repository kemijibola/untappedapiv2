import mongoose from "mongoose";
import { ITimeStamp } from "./Timestamp";
import { IUser } from "./User";
import { IAppSpec } from "./AppSpec";
import { IUserType } from "./UserType";
import { ICategory } from "./Category";
import { ICategoryType } from "./CategoryType";
import { IUserSocialMedia } from "./Profile";
import { IUserContestListAnalysis } from "./custom/ContestList";

export enum ReportType {
  alltalents = "alltalents",
  allprofessionals = "allprofessionals",
  mosttap = "mosttap",
  highestcomment = "highestcomment",
  mostwatchedvideo = "mostwatchedvideo",
  mostplayedsong = "mostplayedsong",
  mostlikedphoto = "mostlikedphoto",
}

export interface CategoryTypeWithCategory {
  categoryTypeId: ICategoryType["_id"];
  categoryTypeName: string;
  category: ICategory["_id"];
}
export interface IUserFilterCategory
  extends ITimeStamp,
    IAppSpec,
    mongoose.Document {
  user: IUser["_id"];
  displayName: string;
  userSocials: IUserSocialMedia[];
  displayPhoto: string;
  bannerPhoto?: string;
  location?: string;
  categoryTypes: CategoryTypeWithCategory[];
  shortDescription: string;
  tapCount: number;
  contestCount: number;
  reportType: ReportType;
  userType: IUserType["_id"];
  contests: IUserContestListAnalysis[];
  createdAt: Date;
  aliasName: string;
  dateJoined: Date;
}

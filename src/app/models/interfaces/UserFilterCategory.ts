import mongoose from "mongoose";
import { ITimeStamp } from "./Timestamp";
import { IUser } from "./User";
import { IAppSpec } from "./AppSpec";
import { IUserType } from "./UserType";
import { ICategory } from "./Category";
import { ICategoryType } from "./CategoryType";

export enum ReportType {
  alltalents = "alltalents",
  allprofessionals = "allprofessionals",
  mosttap = "mosttap",
  highestcomment = "highestcomment",
  mostwatchedvideo = "mostwatchedvideo",
  mostplayedsong = "mostplayedsong",
  mostlikedphoto = "mostlikedphoto"
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
  displayPhoto: string;
  categoryTypes: CategoryTypeWithCategory[];
  shortDescription: string;
  tapCount: number;
  contestCount: number;
  reportType: ReportType;
  userType: IUserType["_id"];
  createdAt: Date;
  aliasName: string;
  dateJoined: Date;
}

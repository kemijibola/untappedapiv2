import mongoose from "mongoose";
import { ITimeStamp } from "./Timestamp";
import { IUser } from "./User";
import { IAppSpec } from "./AppSpec";
import { IMedia } from "./Media";
import { CreatedContest } from "../viewmodels/UserViewModel";
import { IUserType } from "./UserType";
import { ICategory } from "./Category";

export enum ReportType {
  AllTalents = "AllTalents",
  AllProfessionals = "AllProfessionals",
  MostTap = "MostTap",
  HighestComment = "HighestComment",
  MostWatchedVideo = "MostWatchedVideo",
  MostPlayedSong = "MostPlayedSong",
  MostLikedPhoto = "MostLikedPhoto"
}

export interface IUserFilterCategory
  extends ITimeStamp,
    IAppSpec,
    mongoose.Document {
  user: IUser["_id"];
  displayName: string;
  displayPhoto: string;
  categories: ICategory["_id"][];
  shortDescription: string;
  reportType: ReportType;
  userType: IUserType["_id"];
}

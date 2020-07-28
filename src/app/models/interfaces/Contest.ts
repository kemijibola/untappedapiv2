import mongoose from "mongoose";
import { IEvaluation } from "./Evaluation";
import { IUser } from "./User";
import { ITimeStamp, IApproval } from "./Timestamp";
import { ContestType } from "../../data/schema/Contest";
import { IUserSocialMedia } from "./Profile";
import { PaymentStatus } from "./Payment";
import { IAppSpec } from "./AppSpec";
import { IIssueCategory, ComplaintStatus } from "./IssueCategory";
import { MediaType } from "./Media";
import { ICategoryType } from "./CategoryType";
import { IContestEntry, EntryPosition } from "./ContestEntry";

export interface IRedeemable {
  name: PrizePosition;
  prizeCash: number;
}

export enum PrizePosition {
  position1 = "position1",
  position2 = "position2",
  position3 = "position3",
  position4 = "position4",
  position5 = "position5",
}

export interface IJudge {
  name: string;
  email: string;
  profile: string;
  socialMedias: IUserSocialMedia[];
  profession: string[];
  judgeProfileImage: string;
  yearsOfExperience: number;
}
export interface IOffline {
  maxContestant?: number;
  grandFinaleDate?: Date;
  grandFinaleLocation?: string;
  evaluations?: string[];
  judges?: IJudge[];
}

export interface IContest
  extends IOffline,
    IAppSpec,
    ITimeStamp,
    IApproval,
    mongoose.Document {
  title: string;
  code: string;
  information: string;
  bannerImage: string;
  eligibleCategories: ICategoryType["_id"];
  eligibilityInfo: string;
  entryMediaType: MediaType;
  submissionRules: string;
  startDate: Date;
  endDate: Date;
  views: number;
  likedBy: string[];
  evaluations: string[];
  redeemable: IRedeemable[];
  createdBy: IUser["_id"];
  paymentStatus: PaymentStatus;
  issues?: IContestIssues[];
}

interface IContestIssues {
  complaintCategory: IIssueCategory["_id"];
  complaint: string;
  dateCreated: Date;
  complaintStatus: ComplaintStatus;
}

export interface ContestWithEntries {
  contest: IContest;
  submissions: IEntries[];
}

export interface IEntries {
  entry: IContestEntry;
  commentCount: number;
  totalVote: number;
}

export interface ContestWithEntriesPreview {
  contest: IContestPreview;
  entries: IContestEntry[];
}
export interface IContestPreview {
  _id: string;
  title: string;
  banner: string;
  entryCount: number;
}

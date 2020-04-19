import mongoose from "mongoose";
import { CategoryType } from "./Category";
import { IPrizeType } from "./PrizeType";
import { IEvaluation } from "./Evaluation";
import { IUser } from "./User";
import { ITimeStamp } from "./Timestamp";
import { ContestType } from "../../data/schema/Contest";
import { IUserSocialMedia } from "./Profile";
import { PaymentStatus } from "./Payment";
import { IAppSpec } from "./AppSpec";
import { IIssueCategory, ComplaintStatus } from "./IssueCategory";
import { MediaType } from "./Media";

export interface IRedeemable {
  name: string;
  prizeCash: number;
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
    mongoose.Document {
  title: string;
  code: string;
  information: string;
  bannerImage: string;
  eligibleCategories: CategoryType["_id"];
  eligibilityInfo: string;
  entryMediaType: MediaType;
  submissionRules: string;
  startDate: Date;
  endDate: Date;
  views: number;
  likes: number;
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

import mongoose from 'mongoose';
import { ICategory } from './Category';
import { IPrizeType } from './PrizeType';
import { IEvaluation } from './Evaluation';
import { IUser } from './User';
import { ITimeStamp } from './Timestamp';
import { ContestType } from '../../data/schema/Contest';
import { IUserSocialMedia } from './Talent';
import { PaymentStatus } from './Payment';
import { IAppSpec } from './AppSpec';
import { IIssueCategory, ComplaintStatus } from './IssueCategory';
import { MediaType } from './Portfolio';

export interface IRedeemable {
  prizeType: IPrizeType['_id'];
  prizes: any[];
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
  // Contest code is generated after successful payment
  code: number;
  information: string;
  bannerImage: string;
  eligibleCategories: ICategory[];
  eligibilityInfo: string;
  entryMediaType: MediaType;
  submissionRules: string;
  startDate: Date;
  duration: number;
  views: number;
  redeemable: IRedeemable;
  endDate: Date;
  contestType: ContestType;
  createdBy: IUser['_id'];
  paymentStatus: PaymentStatus;
  issues?: IContestIssues[];
}

interface IContestIssues {
  complaintCategory: IIssueCategory['_id'];
  complaint: string;
  dateCreated: Date;
  complaintStatus: ComplaintStatus;
}

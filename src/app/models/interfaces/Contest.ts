import mongoose from 'mongoose';
import { ICategory } from './Category';
import { IPrizeType } from './PrizeType';
import { IEvaluation } from './Evaluation';
import { IUser } from './User';
import { ITimeStamp } from './Timestamp';

export interface IRedeemable {
  prizeType: IPrizeType;
  winners: number[];
}

export interface IOffline {
  maxContestant?: number;
  grandFinaleDate?: Date;
  grandFinaleLocation?: string;
  evaluations?: IEvaluation[];
}

export interface IContest extends IOffline, ITimeStamp, mongoose.Document {
  title: string;
  information: string;
  bannerImage: string;
  eligibleCategories: ICategory[];
  eligibilityInfo: string;
  submissionRules: string;
  startDate: Date;
  duration: number;
  redeemable: IRedeemable;
  endDate: Date;
  createdBy: IUser;
}

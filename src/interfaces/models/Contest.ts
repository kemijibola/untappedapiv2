import mongoose from 'mongoose';
import { Category } from './Category';
import { PrizeType } from './PrizeType';
import { Evaluation } from './Evaluation';
import { User } from './User';
import { TimeStamp } from './Timestamp';

export interface Redeemable {
  prizeType: PrizeType;
  winners: number[];
}

export interface Offline {
  maxContestant: number;
  grandFinaleDate: Date;
  grandFinaleLocation: string;
  evaluations: Evaluation[];
}

export interface Contest extends Offline, TimeStamp, mongoose.Document {
  title: string;
  information: string;
  bannerImage: string;
  eligibleCategories: Category[];
  eligibilityInfo: string;
  submissionRules: string;
  startDate: Date;
  duration: number;
  redeemable: Redeemable;
  endDate: Date;
  createdBy: User;
}

import mongoose from 'mongoose';
import { IUser } from './User';
import { IContest } from './Contest';
import { ITimeStamp } from './Timestamp';

export interface IContestEntry extends ITimeStamp, mongoose.Document {
  user: IUser;
  contest: IContest;
  submissionPath: string;
}

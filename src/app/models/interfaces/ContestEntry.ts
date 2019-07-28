import mongoose from 'mongoose';
import { IUser } from './User';
import { IContest } from './Contest';
import { ITimeStamp } from './Timestamp';
import { IAppSpec } from './AppSpec';

export interface IContestEntry extends ITimeStamp, IAppSpec, mongoose.Document {
  user: IUser;
  contest: IContest;
  submissionPath: string;
  isApproved: boolean;
}

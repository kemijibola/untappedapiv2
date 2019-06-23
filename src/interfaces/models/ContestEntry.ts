import mongoose from 'mongoose';
import { User } from './User';
import { Contest } from './Contest';
import { TimeStamp } from './Timestamp';

export interface ContestEntry extends TimeStamp, mongoose.Document {
  user: User;
  contest: Contest;
  submissionPath: string;
}

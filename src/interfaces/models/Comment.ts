import mongoose from 'mongoose';
import { User } from './User';
import { TimeStamp } from './Timestamp';

interface Reply extends TimeStamp {
  user: User;
  comment: string;
}

export interface Comment extends TimeStamp, mongoose.Document {
  entity: string;
  comment: string;
  user: User;
  replies: Reply[];
}

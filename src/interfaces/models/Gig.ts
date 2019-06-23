import mongoose from 'mongoose';
import { TimeStamp } from './Timestamp';
import { User } from './User';

export interface Gig extends TimeStamp, mongoose.Document {
  sender: User;
  receiver: User;
  note: string;
  items: string[];
  deletedBySender: boolean;
  deletedByReciver: boolean;
}

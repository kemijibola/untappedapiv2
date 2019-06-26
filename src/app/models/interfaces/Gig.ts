import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IUser } from './User';

export interface IGig extends ITimeStamp, mongoose.Document {
  sender: IUser;
  receiver: IUser;
  note: string;
  items: string[];
  deletedBySender: boolean;
  deletedByReciver: boolean;
}

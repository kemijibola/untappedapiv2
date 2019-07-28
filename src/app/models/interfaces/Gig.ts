import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IUser } from './User';
import { IAppSpec } from './AppSpec';

export interface IGig extends ITimeStamp, IAppSpec, mongoose.Document {
  sender: IUser;
  receiver: IUser;
  note: string;
  items: string[];
  deletedBySender: boolean;
  deletedByReciver: boolean;
}

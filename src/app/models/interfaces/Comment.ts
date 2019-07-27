import mongoose from 'mongoose';
import { IUser } from './User';
import { ITimeStamp } from './Timestamp';

export interface IReply extends ITimeStamp {
  user: IUser['_id'];
  reply: string;
}

export interface IComment extends ITimeStamp, mongoose.Document {
  entity: string;
  comment: string;
  user: IUser['_id'];
  replies: IReply[];
}

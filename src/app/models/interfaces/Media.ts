import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IUser } from './User';

export interface ILike {
  user: IUser['_id'];
}

export interface IMediaItem {
  path: string;
  likes: [ILike];
}

export interface IMedia extends ITimeStamp, mongoose.Document {
  title: string;
  shortDescription: string;
  user: IUser['_id'];
  items: [IMediaItem];
}
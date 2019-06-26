import mongoose from 'mongoose';
import { IUser } from './User';
import { ITimeStamp } from './Timestamp';

export enum MediaType {
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
  IMAGE = 'VIDEO'
}

export enum UploadType {
  SINGLE = 'SINGLE',
  ALBUM = 'ALBUM'
}

export interface ICollection {
  path: string;
  likes: number;
}

export interface IPortfolio extends ITimeStamp, mongoose.Document {
  title: string;
  description: string;
  user: IUser;
  mediaType: MediaType;
  uploadType: UploadType;
  items: ICollection[];
}

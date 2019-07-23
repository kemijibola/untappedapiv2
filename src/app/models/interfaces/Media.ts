import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IUser } from './User';

export enum MediaUploadType {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE'
}
export interface IMediaItem {
  path: string;
  likes: IUser['username'][];
}
export interface IMedia extends ITimeStamp, mongoose.Document {
  title: string;
  shortDescription: string;
  user: IUser['_id'];
  items: IMediaItem[];
  uploadType: MediaUploadType;
  isApproved: boolean;
}

export interface IAudio extends IMedia {}
export interface IVideo extends IMedia {}
export interface IImage extends IMedia {}

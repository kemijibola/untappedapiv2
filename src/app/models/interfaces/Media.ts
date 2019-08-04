import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IUser } from './User';
import { IAppSpec } from './AppSpec';

export enum MediaUploadType {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE'
}
export interface IMediaItem {
  index: number;
  path: string;
  likes: IUser['fullName'][];
}
export interface IMedia extends ITimeStamp, IAppSpec, mongoose.Document {
  title: string;
  shortDescription: string;
  user: IUser['_id'];
  items: IMediaItem[];
  uploadType: MediaUploadType;
  isApproved: boolean;
  playedCount: number;
  videoPlayCount: number;
}

export interface IAudio extends IMedia {
  playedCount: number;
}
export interface IVideo extends IMedia {
  videoPlayCount: number;
}
export interface IImage extends IMedia {}

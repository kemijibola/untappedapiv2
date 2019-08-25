import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IUser } from './User';
import { IAppSpec } from './AppSpec';

export enum MediaUploadType {
  single = 'single',
  multiple = 'multiple',
  all = 'all'
}
export enum MediaType {
  audio = 'audio',
  video = 'video',
  image = 'image'
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
  albumCover?: string;
  uploadType: MediaUploadType;
  isApproved: boolean;
  watchCount: number;
  playCount: number;
  viewCount: number;
}

export interface IAudio extends IMedia {
  playCount: number;
}
export interface IVideo extends IMedia {
  watchCount: number;
}
export interface IImage extends IMedia {
  viewCount: number;
}

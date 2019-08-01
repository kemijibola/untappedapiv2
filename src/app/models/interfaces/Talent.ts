import mongoose from 'mongoose';
import { IUser } from './User';
import { ICategory } from './Category';
import { ITimeStamp } from './Timestamp';
import { IAppSpec } from './AppSpec';

export interface IPhysicalStatistics {
  height: string;
  bodyType: string;
  color: string;
}

export enum SocialMedia {
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  INSTAGRAM = 'INSTAGRAM',
  OTHER = 'OTHER'
}

export interface IUserSocialMedia {
  type: SocialMedia;
  handles: string[];
}

export interface ITalent extends ITimeStamp, IAppSpec, mongoose.Document {
  stageName: string;
  location: string;
  phoneNumber: string;
  user: IUser['_id'];
  tapCount: number;
  shortBio: string;
  categories: ICategory['_id'][];
  socialMedias?: IUserSocialMedia[];
  physicalStats: IPhysicalStatistics;
}

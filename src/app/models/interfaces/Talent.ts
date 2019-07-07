import mongoose from 'mongoose';
import { IUser } from './User';
import { ICategory } from './Category';
import { ITimeStamp } from './Timestamp';

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

export interface ITalent extends ITimeStamp, mongoose.Document {
  stageName?: string;
  location: string;
  phoneNumber: string;
  user: IUser;
  shortBio?: string;
  categories: ICategory[];
  socialMedias?: IUserSocialMedia;
  profileImagePath?: string;
  physicalStats: IPhysicalStatistics;
}

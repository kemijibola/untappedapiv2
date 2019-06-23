import mongoose from 'mongoose';
import { User } from './User';
import { Category } from './Category';
import { TimeStamp } from './Timestamp';

interface PhysicalStatistics {
  height: string;
  bodyType: string;
  color: string;
}

enum SocialMedia {
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  INSTAGRAM = 'INSTAGRAM',
  OTHER = 'OTHER'
}

export interface UserSocialMedia {
  type: SocialMedia;
  handles: string[];
}

export interface Talent extends TimeStamp, mongoose.Document {
  stageName: string;
  location: string;
  phoneNumber: string;
  user: User;
  shortBio: string;
  categories: Category[];
  socialMedias: UserSocialMedia;
  profileImagePath: string;
  physicalStats: PhysicalStatistics;
}

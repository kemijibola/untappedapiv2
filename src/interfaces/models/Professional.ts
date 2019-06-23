import mongoose from 'mongoose';
import { User } from './User';
import { Category } from './Category';
import { TimeStamp } from './Timestamp';
import { UserSocialMedia } from './Talent';

export interface Professional extends TimeStamp, mongoose.Document {
  businessName: string;
  name: string;
  officialAddress: string;
  rcNumber: string;
  phoneNumbers: number[];
  user: User;
  shortBio: string;
  categories: Category[];
  socialMedias: UserSocialMedia;
  profileImagePath: string;
  bannerImagePath: string;
}

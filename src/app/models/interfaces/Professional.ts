import mongoose from 'mongoose';
import { IUser } from './User';
import { ICategory } from './Category';
import { ITimeStamp } from './Timestamp';
import { IUserSocialMedia } from './Talent';

export interface IProfessional extends ITimeStamp, mongoose.Document {
  businessName: string;
  name: string;
  officialAddress: string;
  rcNumber: string;
  phoneNumbers: number[];
  user: IUser;
  shortBio: string;
  categories: ICategory[];
  socialMedias: IUserSocialMedia;
  profileImagePath: string;
  bannerImagePath: string;
}

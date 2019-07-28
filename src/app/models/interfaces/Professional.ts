import mongoose from 'mongoose';
import { IUser } from './User';
import { ICategory } from './Category';
import { ITimeStamp } from './Timestamp';
import { IUserSocialMedia } from './Talent';
import { IAppSpec } from './AppSpec';

export interface IProfessional extends ITimeStamp, IAppSpec, mongoose.Document {
  fullName: string;
  officialAddress: string;
  rcNumber: string;
  phoneNumbers: number[];
  user: IUser['_id'];
  shortBio: string;
  categories: ICategory['_id'][];
  socialMedias: IUserSocialMedia[];
  profileImagePath?: string;
  bannerImagePath?: string;
}

import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IUser } from './User';
import { ICountry } from './Country';

export interface IDomain extends ITimeStamp, mongoose.Document {
  name: string;
  rcNumber?: string;
  address: string;
  isApproved: boolean;
  approvedBy: IUser['_id'];
  approvedDate: Date;
  country: ICountry['_id'];
}

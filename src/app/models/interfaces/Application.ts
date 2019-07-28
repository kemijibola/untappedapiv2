import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IUser } from './User';
import { IDomain } from './Domain';

export interface IApplication extends ITimeStamp, mongoose.Document {
  name: string;
  dbUri: string;
  identity: string;
  secret: string;
  isActive: boolean;
  isAdmin: boolean;
  domain: IDomain['_id'];
  approvedBy: IUser['_id'];
  approvedDate: Date;
}

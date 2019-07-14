import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { ICountry } from './Country';

export interface IApplication extends ITimeStamp, mongoose.Document {
  name: string;
  dbHost: string;
  dbName: string;
  dbUser: string;
  dbPassword: string;
  country: ICountry['_id'];
  identity: string;
  isActive: boolean;
}

import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { ICountry } from './Country';

export interface IApplication extends ITimeStamp, mongoose.Document {
  name: string;
  dbUri: string;
  country: ICountry['_id'];
  identity: string;
  isActive: boolean;
}

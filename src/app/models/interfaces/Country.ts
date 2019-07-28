import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IAppSpec } from './AppSpec';

export interface ICountry extends ITimeStamp, IAppSpec, mongoose.Document {
  name: string;
  states: string[];
}

import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';

export interface ICountry extends ITimeStamp, mongoose.Document {
  name: string;
  states: string[];
}

import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';

export interface IRole extends ITimeStamp, mongoose.Document {
  name: string;
  global: boolean;
  description: string;
}

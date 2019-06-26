import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';

export interface IUserType extends ITimeStamp, mongoose.Document {
  name: string;
  global: boolean;
  description: string;
}

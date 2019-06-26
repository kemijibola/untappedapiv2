import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';

export interface ICategory extends ITimeStamp, mongoose.Document {
  name: string;
}

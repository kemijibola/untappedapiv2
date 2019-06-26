import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';

export interface IEvaluation extends ITimeStamp, mongoose.Document {
  name: string;
}

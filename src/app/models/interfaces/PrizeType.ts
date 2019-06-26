import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';

export interface IPrizeType extends ITimeStamp, mongoose.Document {
  name: string;
}

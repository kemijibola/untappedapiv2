import mongoose from 'mongoose';
import { TimeStamp } from './Timestamp';

export interface PrizeType extends TimeStamp, mongoose.Document {
  name: string;
}

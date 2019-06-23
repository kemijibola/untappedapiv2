import mongoose from 'mongoose';
import { TimeStamp } from './Timestamp';

export interface Evaluation extends TimeStamp, mongoose.Document {
  name: string;
}

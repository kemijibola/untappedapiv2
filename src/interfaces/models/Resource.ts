import mongoose from 'mongoose';
import { TimeStamp } from './Timestamp';

export interface Resource extends TimeStamp, mongoose.Document {
  name: string;
}

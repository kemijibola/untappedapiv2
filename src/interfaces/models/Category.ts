import mongoose from 'mongoose';
import { TimeStamp } from './Timestamp';

export interface Category extends TimeStamp, mongoose.Document {
  name: string;
}

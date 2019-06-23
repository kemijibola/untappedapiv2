import mongoose from 'mongoose';
import { TimeStamp } from './Timestamp';

export interface Country extends TimeStamp, mongoose.Document {
  name: string;
  states: string[];
}

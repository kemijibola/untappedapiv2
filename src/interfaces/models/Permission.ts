import mongoose from 'mongoose';
import { TimeStamp } from './Timestamp';

export interface Permission extends TimeStamp, mongoose.Document {
  name: string;
}

import mongoose from 'mongoose';
import { TimeStamp } from './Timestamp';

export interface UserType extends TimeStamp, mongoose.Document {
  name: string;
  global: boolean;
  description: string;
}

import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';

export interface IResource extends ITimeStamp, mongoose.Document {
  name: string;
}

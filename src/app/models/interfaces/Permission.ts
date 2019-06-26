import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';

export interface IPermission extends ITimeStamp, mongoose.Document {
  name: string;
}

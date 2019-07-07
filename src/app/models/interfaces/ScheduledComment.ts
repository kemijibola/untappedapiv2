import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';

export interface IScheduledComment extends ITimeStamp, mongoose.Document {
  entityId: string;
  entity: string;
}

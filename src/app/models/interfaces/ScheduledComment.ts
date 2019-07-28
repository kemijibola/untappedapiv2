import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IAppSpec } from './AppSpec';

export interface IScheduledComment
  extends ITimeStamp,
    IAppSpec,
    mongoose.Document {
  entityId: string;
  entity: string;
}

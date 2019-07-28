import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IAppSpec } from './AppSpec';

export interface IPrizeType extends ITimeStamp, IAppSpec, mongoose.Document {
  name: string;
}

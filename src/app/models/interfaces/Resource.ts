import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IAppSpec } from './AppSpec';

export interface IResource extends ITimeStamp, IAppSpec, mongoose.Document {
  name: string;
}

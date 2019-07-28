import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IAppSpec } from './AppSpec';

export interface IUserType extends ITimeStamp, IAppSpec, mongoose.Document {
  name: string;
  global: boolean;
  description: string;
}

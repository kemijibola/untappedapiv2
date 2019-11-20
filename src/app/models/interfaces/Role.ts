import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IAppSpec } from './AppSpec';

export interface IRole extends ITimeStamp, IAppSpec, mongoose.Document {
  name: string;
  description: string;
  isActive: boolean;
  isDefault: boolean;
}

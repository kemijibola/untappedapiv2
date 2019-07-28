import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IAppSpec } from './AppSpec';

export interface IService extends ITimeStamp, IAppSpec, mongoose.Document {
  name: string;
  price: number;
  description?: string;
}

import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';

export enum PermissionType {
  DEFAULT = 'DEFAULT',
  CUSTOM = 'CUSTOM'
}

export interface IPermission extends ITimeStamp, mongoose.Document {
  name: string;
  type: PermissionType;
}

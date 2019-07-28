import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IAppSpec } from './AppSpec';

export enum PermissionType {
  DEFAULT = 'DEFAULT',
  CUSTOM = 'CUSTOM'
}

export interface IPermission extends ITimeStamp, IAppSpec, mongoose.Document {
  name: string;
  type: PermissionType;
}

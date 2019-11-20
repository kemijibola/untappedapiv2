import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IAppSpec } from './AppSpec';
import { IRole } from '.';

export enum PermissionType {
  DEFAULT = 'DEFAULT',
  CUSTOM = 'CUSTOM'
}

export interface IPermission extends ITimeStamp, IAppSpec, mongoose.Document {
  name: string;
  role: IRole['_id'];
}

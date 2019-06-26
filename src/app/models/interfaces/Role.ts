import mongoose from 'mongoose';
import { IUserType } from './UserType';
import { IPermission } from './Permission';
import { ITimeStamp } from './Timestamp';

export enum RoleType {
  PAID = 'PAID',
  FREE = 'FREE'
}
export interface IRole extends ITimeStamp, mongoose.Document {
  name: string;
  userType: IUserType;
  roleType: RoleType;
}

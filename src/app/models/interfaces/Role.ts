import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';

export enum RoleType {
  PAID = 'PAID',
  FREE = 'FREE'
}
export interface IRole extends ITimeStamp, mongoose.Document {
  name: string;
  roleType: RoleType;
}

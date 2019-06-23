import mongoose from 'mongoose';
import { UserType } from './UserType';
import { Permission } from './Permission';
import { TimeStamp } from './Timestamp';

enum RoleType {
  PAID = 'PAID',
  FREE = 'FREE'
}
export interface Role extends TimeStamp, mongoose.Document {
  name: string;
  userType: UserType;
  roleType: RoleType;
  permissions: Permission[];
}

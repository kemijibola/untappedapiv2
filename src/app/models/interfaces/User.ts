import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IRole } from './Role';

enum AccountStatus {
  ACTIVATED = 'ACTIVATED',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED'
}
interface IUserAccountStatus {
  status: AccountStatus;
  updatedAt: Date;
}

export interface IUser extends ITimeStamp, mongoose.Document {
  email: string;
  name: string;
  password: string;
  isEmailConfirmed: boolean;
  isPhoneConfirmed: boolean;
  isProfileCompleted: boolean;
  generalNotification: boolean;
  emailNotification: boolean;
  profileVisibility: boolean;
  loginCount: number;
  status: IUserAccountStatus;
  roles: IRole[];
  lastLogin: Date;
}

import mongoose from 'mongoose';
import { TimeStamp } from './Timestamp';
import { Role } from './Role';

enum AccountStatus {
  ACTIVATED = 'ACTIVATED',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED'
}
interface UserAccountStatus {
  status: AccountStatus;
  updatedAt: Date;
}

export interface User extends TimeStamp, mongoose.Document {
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
  status: UserAccountStatus;
  roles: Role[];
  lastLogin: Date;
}

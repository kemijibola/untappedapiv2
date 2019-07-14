import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IRole } from './Role';
import { SignInOptions } from './custom/Global';

enum AccountStatus {
  ACTIVATED = 'ACTIVATED',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED'
}
export interface IUserAccountStatus {
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
  roles: IRole['_id'][];
  lastLogin: Date;
}

export interface IUserModel extends IUser, mongoose.Document {
  comparePassword(password: string): Promise<boolean>;
  generateToken(
    privateKey: string,
    signOptions: SignInOptions,
    payload: any
  ): Promise<string>;
}

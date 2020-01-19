import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IRole } from './Role';
import { SignInOptions } from './custom/Global';
import { IAppSpec } from './AppSpec';

export enum AccountStatus {
  ACTIVATED = 'ACTIVATED',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED',
  DEFAULT = 'DEFAULT'
}
export interface IUserAccountStatus {
  status: AccountStatus;
  updatedAt: Date;
}

//
export interface IUser extends ITimeStamp, IAppSpec, mongoose.Document {
  email: string;
  fullName: string;
  password: string;
  userType: string;
  profileImagePath?: string;
  isEmailConfirmed: boolean;
  isPhoneConfirmed: boolean;
  isProfileCompleted: boolean;
  tapNotification: boolean;
  generalNotification: boolean;
  emailNotification: boolean;
  profileVisibility: boolean;
  passwordResetRequested: boolean;
  isBounced: boolean;
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
  ): Promise<any>;
  verifyToken(
    encodedJwt: string,
    publicKey: string,
    verifyOptions: any
  ): Promise<any>;
}

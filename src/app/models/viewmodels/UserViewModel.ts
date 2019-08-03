import { IUserAccountStatus } from '../interfaces';

export interface UserViewModel {
  _id?: string;
  email: string;
  fullName: string;
  profileImagePath?: string;
  isEmailConfirmed: boolean;
  isPhoneConfirmed: boolean;
  isProfileCompleted: boolean;
  generalNotification: boolean;
  emailNotification: boolean;
  profileVisibility: boolean;
  loginCount: number;
  status: [IUserAccountStatus];
  roles: string[];
  lastLogin: Date;
  createdAt: Date;
}

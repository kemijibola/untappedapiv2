import { IPermission } from './Permission';
import { TokenType } from './custom/GlobalEnum';
import { IRole, IUserType } from '.';

export interface IAuthData {
  access_token: string;
  permissions: IPermission[];
  user_data: IUserData;
}

interface IUserData {
  _id: string;
  full_name: string;
  email: string;
  profile_is_completed: boolean;
  userType: UserType;
}

interface UserType {
  _id: string;
  name: string;
}

export interface AuthPayload {
  type: TokenType;
}
export interface ILogin {
  email: string;
  password: string;
  audience: string;
  issuer: string;
}

export interface IRegister {
  fullName: string;
  email: string;
  password: string;
  userType: string;
  audience: string;
  confirmationUrl: string;
  roles: string[];
}

export interface IDestinationUrl {
  destinationUrl: string;
}

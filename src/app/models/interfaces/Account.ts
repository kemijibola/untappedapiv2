import { IPermission } from './Permission';
import { IRole } from './Role';
import { TokenType } from './custom/GlobalEnum';

export interface IAuthData {
  access_token: string;
  permissions: string[];
  user_data: IUserData;
}

interface IUserData {
  _id: string;
  fullName: string;
  email: string;
  role: UserRole;
}

interface UserRole {
  _id: string;
  name: string;
}

export interface AuthPayload {
  type: TokenType;
}
export interface ILogin extends IDestinationUrl {
  email: string;
  password: string;
  audience: string;
  issuer: string;
}

export interface IRegister {
  fullName: string;
  email: string;
  password: string;
  roles: IRole['_id'][];
  audience: string;
  confirmationUrl: string;
}

export interface IDestinationUrl {
  destinationUrl: string;
}

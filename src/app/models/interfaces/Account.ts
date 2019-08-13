import { IPermission } from './Permission';
import { IRole } from './Role';
import { TokenType } from './custom/GlobalEnum';

export interface IAuthData {
  _id: string;
  token?: string;
  roles: IRole['_id'][];
}

export interface AuthPayload {
  usage: TokenType;
  permissions: string[];
}
export interface ILogin extends IDestinationUrl {
  email: string;
  password: string;
  audience: string;
  issuer: string;
}

export interface IRegister {
  username: string;
  email: string;
  password: string;
  roles: IRole['_id'][];
  audience: string;
  issuer: string;
}

export interface IDestinationUrl {
  destinationUrl: string;
}

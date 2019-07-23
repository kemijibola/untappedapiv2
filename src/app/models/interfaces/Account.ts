import { IPermission } from './Permission';
import { IRole } from './Role';

export interface IAuthData {
  email: string;
  _id: string;
  token?: string;
  roles: IRole['name'][];
  permissions: {};
}

export interface ILogin extends IDestinationUrl {
  email: string;
  password: string;
  audience: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
  roles: IRole['name'];
  audience: string;
}

export interface IDestinationUrl {
  destinationUrl: string;
}

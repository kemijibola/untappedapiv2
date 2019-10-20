import { IUser, IRole } from '../';

export interface ICreateUser {
  email: IUser['email'];
  fullName: IUser['fullName'];
  password: IUser['password'];
  roles: IRole['_id'][];
}

export interface ILoginUser {
  email: IUser['email'];
  password: IUser['password'];
  audience: string;
}

export interface ConfirmEmailRequest {
  userEmail: string;
  token: string;
  audience: string;
}

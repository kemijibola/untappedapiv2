import { IUser, IRole } from '../';

export interface ICreateUser {
  email: IUser['email'];
  name: IUser['name'];
  password: IUser['password'];
  roles: IRole['_id'][];
}

export interface ILoginUser {
  email: IUser['email'];
  password: IUser['password'];
  audience: string;
}

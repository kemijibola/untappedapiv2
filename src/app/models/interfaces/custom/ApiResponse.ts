import { IUser } from '../User';
import { IRole } from '../Role';

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface AuthResponse {
  token: string;
  permissions: Object;
  user: AuthUser;
}

export interface AuthUser {
  _id: IUser['_id'];
  email: string;
  roles: IRole['name'][];
}

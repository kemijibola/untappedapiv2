import { IPermission } from "./Permission";
import { TokenType } from "./custom/GlobalEnum";
import { IRole, IUserType } from ".";
import { IRolePermission } from "./RolePermission";

export interface IAuthData {
  access_token: string;
  refresh_token: string;
  permissions: IRolePermission[];
  user_data: IUserData;
  token_expires: Date;
}

interface IUserData {
  _id: string;
  full_name: string;
  email: string;
  profile_is_completed: boolean;
  profile_image_path: string;
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

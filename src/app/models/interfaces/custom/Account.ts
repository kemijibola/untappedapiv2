import { IUser, IRole, IUserModel } from "../";
import { TokenType } from "./GlobalEnum";

export interface ICreateUser {
  email: IUser["email"];
  fullName: IUser["fullName"];
  password: IUser["password"];
  roles: IRole["_id"][];
}

export interface ILoginUser {
  email: IUser["email"];
  password: IUser["password"];
  audience: string;
}

export interface ConfirmEmailRequest {
  userEmail: string;
  token: string;
  audience: string;
  user?: IUserModel["_id"];
}

export interface TokenGenerationRequest {
  user: IUserModel;
  audience: string;
  redirectUrl: string;
  tokenType: TokenType;
  tokenExpiresIn: number;
}

export interface TokenResult {
  data?: any;
  error?: string;
}

export interface ChangePasswordData {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface VerifyResetPasswordRequest {
  email: string;
  token: string;
  audience: string;
}

import { IPermission } from "../Permission";

export interface UserPermissions {
  permissions: IPermission["name"][];
}

export interface SignInOptions {
  issuer: string;
  audience: string;
  expiresIn: number;
  algorithm: string;
  keyid: string;
  subject: string;
}

import { Request } from "express";
import { IUser } from "../User";
import { IApplication } from "../Application";

export interface RequestWithUser extends Request {
  user?: any;
  appUser?: IApplication;
}

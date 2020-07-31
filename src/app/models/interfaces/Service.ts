import mongoose from "mongoose";
import { ITimeStamp } from "./Timestamp";
import { IAppSpec } from "./AppSpec";
import { IUser } from "./User";

export interface IService extends ITimeStamp, IAppSpec, mongoose.Document {
  name: string;
  type: ServiceType;
  price: number;
  vat: number;
  active: boolean;
  surchargeFee: number;
  description?: string;
  createdBy: IUser["_id"];
}

export enum ServiceType {
  contest = "contest",
  userrequest = "userrequest",
}

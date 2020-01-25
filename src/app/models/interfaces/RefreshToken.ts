import mongoose from "mongoose";
import { ITimeStamp } from "./Timestamp";
import { IAppSpec } from "./AppSpec";
import { DateTime } from "aws-sdk/clients/devicefarm";
import { IUser } from ".";

export interface IRefreshToken extends ITimeStamp, IAppSpec, mongoose.Document {
  token: string;
  ownerId: IUser["_id"];
  isExpired: boolean;
}

export interface IRefreshTokenViewModel {
  _id?: string;
  token?: string;
  ownerId?: IUser["_id"];
  isExpired?: boolean;
  application?: string;
}

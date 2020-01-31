import mongoose from "mongoose";
import { ITimeStamp } from "./Timestamp";
import { IUser } from "./User";
import { DateTime } from "aws-sdk/clients/ec2";

export interface IApplication extends ITimeStamp, mongoose.Document {
  name: string;
  dbUri: string;
  audience: string;
  clientId: string;
  emailConfirmationRedirectUrl: string;
  refreshTokenExpiresIn: number;
  redirectBaseUrl: string;
  clientSecret: string;
  isActive: boolean;
  approvedBy: IUser["_id"];
  approvedDate: DateTime;
}

import { IUser } from "../interfaces";
import { DateTime } from "aws-sdk/clients/devicefarm";

export interface ApplicationViewModel {
  _id?: string;
  name: string;
  dbUri: string;
  audience: string;
  clientId: string;
  clientSecret: string;
  isActive: boolean;
  approvedBy: IUser["_id"];
  approvedDate: DateTime;
}

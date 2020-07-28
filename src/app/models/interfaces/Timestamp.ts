import { IUser } from "./User";

export interface ITimeStamp {
  createdAt: Date;
  updateAt?: Date;
}

export interface IApproval {
  approved: boolean;
  approvedBy?: IUser["_id"];
  approvedDate?: Date;
}

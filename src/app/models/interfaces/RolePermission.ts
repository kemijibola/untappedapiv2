import { IPermission } from "./Permission";
import mongoose from "mongoose";
import { ITimeStamp } from "./Timestamp";
import { IAppSpec } from "./AppSpec";
import { IRole } from "./Role";
import { IUserType } from "./UserType";

export interface IRolePermission
  extends ITimeStamp,
    IAppSpec,
    mongoose.Document {
  role: IRole["_id"];
  permission: IPermission["_id"];
  userType: IUserType["_id"];
}

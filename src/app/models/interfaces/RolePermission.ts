import { IPermission } from "./Permission";
import mongoose from "mongoose";
import { ITimeStamp } from "./Timestamp";
import { IAppSpec } from "./AppSpec";
import { IRole } from "./Role";

export interface IRolePermission
  extends ITimeStamp,
    IAppSpec,
    mongoose.Document {
  role: IRole["_id"];
  permission: IPermission["_id"];
}

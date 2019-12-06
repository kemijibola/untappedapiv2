import mongoose from "mongoose";
import { ITimeStamp } from "./Timestamp";
import { IAppSpec } from "./AppSpec";
import { ICategory } from "./Category";

export interface ICategoryType extends ITimeStamp, IAppSpec, mongoose.Document {
  name: string;
  category: ICategory["_id"];
}

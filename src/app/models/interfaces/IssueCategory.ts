import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IAppSpec } from './AppSpec';
import { IUser } from './User';

export interface IIssueCategory
  extends ITimeStamp,
    IAppSpec,
    mongoose.Document {
  name: string;
  isActive: boolean;
  createdBy: IUser['_id'];
  approvedBy?: IUser['_id'];
  approveDate?: Date;
}

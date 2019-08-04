import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';
import { IUser } from './User';
import { IAppSpec } from './AppSpec';
import { ICategory } from './Category';

export interface IGig extends ITimeStamp, IAppSpec, mongoose.Document {
  sender: IUser['_id'];
  receiver: IUser['_id'];
  talentCategories: ICategory['_id'];
  note: string;
  items: string[];
  deletedBySender: boolean;
  deletedByReciver: boolean;
}

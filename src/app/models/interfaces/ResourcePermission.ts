import mongoose from 'mongoose';
import { IResource } from './Resource';
import { IRole } from './Role';
import { ITimeStamp } from './Timestamp';
import { IPermission } from './Permission';

export interface IResourcePermission extends ITimeStamp, mongoose.Document {
  resource: IResource['_id'];
  role: IRole['_id'];
  permissions: IPermission['_id'];
}

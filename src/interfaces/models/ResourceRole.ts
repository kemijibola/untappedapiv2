import mongoose from 'mongoose';
import { Resource } from './Resource';
import { Role } from './Role';
import { TimeStamp } from './Timestamp';

export interface ResourceRole extends TimeStamp, mongoose.Document {
  resource: Resource;
  role: Role;
}

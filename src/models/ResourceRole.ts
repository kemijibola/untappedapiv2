import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { ResourceRole } from '../interfaces/models';

const resourceRoleSchema = new Schema(
  {
    resource: { type: Schema.Types.ObjectId, ref: 'Resource', required: true },
    role: { type: Schema.Types.ObjectId, ref: 'Role', required: true }
  },
  { timestamps: true }
);

const ResourceRole = mongoose.model<ResourceRole>(
  'ResourceRole',
  resourceRoleSchema
);
export default ResourceRole;

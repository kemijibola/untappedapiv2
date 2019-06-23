import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { Permission } from '../interfaces/models';

const permissionSchema = new Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true }
);

const Permission = mongoose.model<Permission>('Permission', permissionSchema);
export default Permission;

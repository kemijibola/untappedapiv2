import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { Role } from '../interfaces/models';

const roleSchema = new Schema(
  {
    name: { type: String, required: true },
    userType: { type: Schema.Types.ObjectId, ref: 'UserType', required: true },
    roleType: { type: String, required: true },
    permissions: [
      { type: Schema.Types.ObjectId, ref: 'Permission', required: true }
    ]
  },
  { timestamps: true }
);

const Role = mongoose.model<Role>('Role', roleSchema);
export default Role;

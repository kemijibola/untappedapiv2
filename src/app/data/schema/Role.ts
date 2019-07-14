import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IRole } from '../../models/interfaces';

const roleSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    global: {
      type: Boolean,
      required: true,
      default: false
    },
    description: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const RoleSchema = mongooseConnection.model<IRole>('Role', roleSchema);

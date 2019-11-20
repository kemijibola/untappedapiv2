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
    userType: {
      type: Schema.Types.ObjectId,
      ref: 'UserType'
    },
    description: {
      type: String
    },

    isDefault: {
      type: Boolean,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export const RoleSchema = mongooseConnection.model<IRole>('Role', roleSchema);

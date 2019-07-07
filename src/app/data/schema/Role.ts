import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IRole, RoleType } from '../../models/interfaces';

const roleSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    userType: {
      type: Schema.Types.ObjectId,
      ref: 'UserType',
      required: true
    },
    roleType: {
      type: RoleType,
      required: true
    }
  },
  { timestamps: true }
);

export const RoleSchema = mongooseConnection.model<IRole>('Role', roleSchema);

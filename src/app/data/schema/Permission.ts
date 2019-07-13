import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IPermission, PermissionType } from '../../models/interfaces';

const permissionSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: PermissionType, required: true }
  },
  { timestamps: true }
);

export const PermissionSchema = mongooseConnection.model<IPermission>(
  'Permission',
  permissionSchema
);

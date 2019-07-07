import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IPermission } from '../../models/interfaces';

const permissionSchema: Schema = new Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true }
);

export const PermissionSchema = mongooseConnection.model<IPermission>(
  'Permission',
  permissionSchema
);

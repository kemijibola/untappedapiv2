import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IPermission, PermissionType } from '../../models/interfaces';

const permissionSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, required: true },
    application: {
      type: Schema.Types.ObjectId,
      ref: 'Application'
    }
  },
  { timestamps: true }
);

export const PermissionSchema = mongooseConnection.model<IPermission>(
  'Permission',
  permissionSchema
);

import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IResourcePermission } from '../../models/interfaces';

const resourcePermissionSchema: Schema = new Schema(
  {
    resource: {
      type: Schema.Types.ObjectId,
      ref: 'Resource',
      required: true
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true
    },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Permission',
        required: true
      }
    ]
    // application: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Application',
    //   required: true
    // }
  },
  { timestamps: true }
);

export const ResourcePermissionSchema = mongooseConnection.model<
  IResourcePermission
>('ResourcePermission', resourcePermissionSchema);

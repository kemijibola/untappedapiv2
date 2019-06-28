import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IResourcePermission } from '../../models/interfaces';

class ResourcePermissionSchema {
  static get schema() {
    const schema = new Schema(
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
      },
      { timestamps: true }
    );
    return schema;
  }
}

const schema = mongooseConnection.model<IResourcePermission>(
  'ResourcePermission',
  ResourcePermissionSchema.schema
);
export = schema;

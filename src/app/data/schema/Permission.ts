import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IPermission } from '../../models/interfaces';

class PermissionSchema {
  static get schema() {
    const schema = new Schema(
      {
        name: { type: String, required: true }
      },
      { timestamps: true }
    );
    return schema;
  }
}

const schema = mongooseConnection.model<IPermission>(
  'Permission',
  PermissionSchema.schema
);
export = schema;

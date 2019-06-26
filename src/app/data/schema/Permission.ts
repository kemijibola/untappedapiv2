import MongodataAccess = require('../MongodataAccess');
const mongoose = MongodataAccess.mongooseInstance;
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IPermission } from '../../models/interfaces';

class PermissionSchema {
  static get schema() {
    const schema = mongoose.Schema(
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

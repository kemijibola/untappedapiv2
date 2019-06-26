import MongodataAccess = require('../MongodataAccess');
const mongoose = MongodataAccess.mongooseInstance;
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IRole } from '../../models/interfaces';

class RoleSchema {
  static get schema() {
    const schema = mongoose.Schema(
      {
        name: {
          type: String,
          required: true
        },
        userType: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'UserType',
          required: true
        },
        roleType: {
          type: String,
          required: true
        }
      },
      { timestamps: true }
    );
    return schema;
  }
}

const schema = mongooseConnection.model<IRole>('Role', RoleSchema.schema);
export = schema;

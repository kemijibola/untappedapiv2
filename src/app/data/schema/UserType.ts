import MongodataAccess = require('../MongodataAccess');
const mongoose = MongodataAccess.mongooseInstance;
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IUserType } from '../../models/interfaces';

class UserTypeSchema {
  static get schema() {
    const schema = mongoose.Schema(
      {
        name: {
          type: String,
          required: true
        },
        global: {
          type: Boolean,
          required: true,
          default: false
        },
        description: {
          type: String,
          required: true
        }
      },
      { timestamps: true }
    );
    return schema;
  }
}

const schema = mongooseConnection.model<IUserType>(
  'UserType',
  UserTypeSchema.schema
);
export = schema;

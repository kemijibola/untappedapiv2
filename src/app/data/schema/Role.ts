import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IRole } from '../../models/interfaces';

class RoleSchema {
  static get schema() {
    const schema = new Schema(
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

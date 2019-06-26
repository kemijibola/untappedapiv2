import MongodataAccess = require('../MongodataAccess');
const mongoose = MongodataAccess.mongooseInstance;
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IResource } from '../../models/interfaces';

class ResourceSchema {
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

const schema = mongooseConnection.model<IResource>(
  'Resource',
  ResourceSchema.schema
);
export = schema;

import MongodataAccess = require('../MongodataAccess');
const mongoose = MongodataAccess.mongooseInstance;
const mongooseConnection = MongodataAccess.mongooseConnection;
import { ICategory } from '../../models/interfaces';

class CategorySchema {
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

const schema = mongooseConnection.model<ICategory>(
  'Category',
  CategorySchema.schema
);
export = schema;

import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IPrizeType } from '../../models/interfaces';

class PrizeTypeSchema {
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

const schema = mongooseConnection.model<IPrizeType>(
  'PrizeType',
  PrizeTypeSchema.schema
);
export = schema;

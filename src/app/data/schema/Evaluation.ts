import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IEvaluation } from '../../models/interfaces';

class EvaluationSchema {
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

const schema = mongooseConnection.model<IEvaluation>(
  'Evaluation',
  EvaluationSchema.schema
);
export = schema;

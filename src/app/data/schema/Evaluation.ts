import MongodataAccess = require('../MongodataAccess');
const mongoose = MongodataAccess.mongooseInstance;
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IEvaluation } from '../../models/interfaces';

class EvaluationSchema {
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

const schema = mongooseConnection.model<IEvaluation>(
  'Evaluation',
  EvaluationSchema.schema
);
export = schema;

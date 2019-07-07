import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IEvaluation } from '../../models/interfaces';

const evaluationSchema: Schema = new Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true }
);

export const EvaluationSchema = mongooseConnection.model<IEvaluation>(
  'Evaluation',
  evaluationSchema
);

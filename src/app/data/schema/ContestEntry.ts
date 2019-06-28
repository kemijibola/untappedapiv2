import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IContestEntry } from '../../models/interfaces';

class ContestEntrySchema {
  static get schema() {
    const schema = new Schema(
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        contest: {
          type: Schema.Types.ObjectId,
          ref: 'Contest',
          required: true
        },
        submissionPath: { type: String, required: true }
      },
      { timestamps: true }
    );
    return schema;
  }
}

const schema = mongooseConnection.model<IContestEntry>(
  'ContestEntry',
  ContestEntrySchema.schema
);
export = schema;

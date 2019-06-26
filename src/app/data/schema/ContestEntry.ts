import MongodataAccess = require('../MongodataAccess');
const mongoose = MongodataAccess.mongooseInstance;
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IContestEntry } from '../../models/interfaces';

class ContestEntrySchema {
  static get schema() {
    const schema = mongoose.Schema(
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        contest: {
          type: mongoose.Schema.Types.ObjectId,
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

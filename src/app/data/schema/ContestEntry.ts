import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IContestEntry } from '../../models/interfaces';

const contestEntrySchema: Schema = new Schema(
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

export const ContestEntrySchema = mongooseConnection.model<IContestEntry>(
  'ContestEntry',
  contestEntrySchema
);

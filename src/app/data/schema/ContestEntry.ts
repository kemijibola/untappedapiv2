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
    submissionPath: { type: String, required: true },
    voteCount: { type: Number, default: 0 },
    isApproved: { type: Boolean, default: false },
    application: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    }
  },
  { timestamps: true }
);

export const ContestEntrySchema = mongooseConnection.model<IContestEntry>(
  'ContestEntry',
  contestEntrySchema
);

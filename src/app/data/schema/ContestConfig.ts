import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IContestConfig } from '../../models/interfaces';

const contestConfigSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String },
    isActivated: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    dayFromRange: { type: Number, default: 0 },
    dayToRange: { type: Number, default: 0 },
    approvedDate: { type: Date },
    application: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    }
  },
  { timestamps: true }
);

export const ContestConfigSchema = mongooseConnection.model<IContestConfig>(
  'ContestConfig',
  contestConfigSchema
);

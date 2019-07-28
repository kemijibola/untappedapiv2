import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IPrizeType } from '../../models/interfaces';

const prizeTypeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    application: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    }
  },
  { timestamps: true }
);

export const PrizeTypeSchema = mongooseConnection.model<IPrizeType>(
  'PrizeType',
  prizeTypeSchema
);

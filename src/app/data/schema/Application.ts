import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IApplication } from '../../models/interfaces';

const applicationSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    dbUri: { type: String, required: true },
    country: { type: Schema.Types.ObjectId, ref: 'Country' },
    identity: { type: String, required: true },
    secret: { type: String, required: true },
    isActive: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const ApplicationSchema = mongooseConnection.model<IApplication>(
  'Application',
  applicationSchema
);

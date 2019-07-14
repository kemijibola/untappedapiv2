import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IApplication } from '../../models/interfaces';

const applicationSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    dbHost: { type: String, required: true },
    dbName: { type: String, required: true },
    dbUser: { type: String, required: true },
    dbPassword: { type: String, required: true },
    country: { type: Schema.Types.ObjectId, ref: 'Country' },
    identity: { type: String, required: true },
    isActive: { type: String, default: false }
  },
  { timestamps: true }
);

export const ApplicationSchema = mongooseConnection.model<IApplication>(
  'Application',
  applicationSchema
);

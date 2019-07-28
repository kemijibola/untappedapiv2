import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IApplication } from '../../models/interfaces';

const applicationSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    dbUri: { type: String, required: true },
    identity: { type: String, required: true },
    secret: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    idAdmin: { type: Boolean, default: false },
    domain: { type: Schema.Types.ObjectId, ref: 'Domain', required: true },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    approvedDate: { type: Date }
  },
  { timestamps: true }
);

export const ApplicationSchema = mongooseConnection.model<IApplication>(
  'Application',
  applicationSchema
);

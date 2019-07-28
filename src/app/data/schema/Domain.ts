import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IDomain } from '../../models/interfaces/Domain';

const domainSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    rcNumber: { type: String },
    address: { type: String, required: true },
    isApproved: { type: Boolean, default: true },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    approvedDate: { type: Date },
    country: { type: Schema.Types.ObjectId, ref: 'Country', required: true }
  },
  { timestamps: true }
);

export const DomainSchema = mongooseConnection.model<IDomain>(
  'Domain',
  domainSchema
);

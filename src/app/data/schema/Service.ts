import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IService } from '../../models/interfaces';

const serviceSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String },
    isActivated: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    approvedDate: { type: Date },
    application: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    }
  },
  { timestamps: true }
);

export const ServiceSchema = mongooseConnection.model<IService>(
  'Service',
  serviceSchema
);

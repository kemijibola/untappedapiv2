import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IApproval } from '../../models/interfaces';

const approvalSchema: Schema = new Schema(
  {
    entity: { type: String, required: true },
    operation: {
      type: Schema.Types.ObjectId,
      ref: 'ApprovalOperation',
      required: true
    },
    approved: { type: Boolean, default: false },
    rejectionReasons: { type: String },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rejectionDate: { type: Date },
    approvedDate: { type: Date },
    application: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    }
  },
  { timestamps: true }
);

export const ApprovalSchema = mongooseConnection.model<IApproval>(
  'ApprovalSchema',
  approvalSchema
);

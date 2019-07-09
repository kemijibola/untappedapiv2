import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IApproval, ApprovalOperations } from '../../models/interfaces';

const approvalSchema: Schema = new Schema(
  {
    entity: { type: String, required: true },
    operation: { type: ApprovalOperations, required: true },
    approved: { type: Boolean, default: false },
    rejectionReasons: { type: String },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rejectionDate: { type: Date },
    approvedDate: { type: Date }
  },
  { timestamps: true }
);

export const ApprovalSchema = mongooseConnection.model<IApproval>(
  'ApprovalSchema',
  approvalSchema
);
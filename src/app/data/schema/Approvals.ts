import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IApproval, ApprovalOperations } from '../../models/interfaces';

const approvalSchema: Schema = new Schema(
  {
    entity: { type: String, required: true },
    operation: { type: ApprovalOperations, required: true },
    // operation: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'ApprovalOperation',
    //   required: true
    // },
    approved: { type: Boolean, default: false },
    rejectionReasons: { type: String },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    rejectionDate: { type: Date, default: Date.now },
    approvedDate: { type: Date, default: Date.now },
    application: {
      type: Schema.Types.ObjectId,
      ref: 'Application'
    }
  },
  { timestamps: true }
);

export const ApprovalSchema = mongooseConnection.model<IApproval>(
  'ApprovalSchema',
  approvalSchema
);

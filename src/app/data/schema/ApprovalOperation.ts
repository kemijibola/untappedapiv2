import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IApprovalOperation } from '../../models/interfaces';

const approvalOperationSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    application: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    }
  },
  { timestamps: true }
);

export const ApprovalOperationSchema = mongooseConnection.model<
  IApprovalOperation
>('ApprovalOperation', approvalOperationSchema);

import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IIssueCategory } from '../../models/interfaces';

const issueSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    approveDate: { type: Date },
    application: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    }
  },
  { timestamps: true }
);

export const IssueCategorySchema = mongooseConnection.model<IIssueCategory>(
  'IssueCategory',
  issueSchema
);

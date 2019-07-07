import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IScheduledComment } from '../../models/interfaces';

const scheduledCommentSchema: Schema = new Schema(
  {
    entityId: { type: String, required: true }
  },
  { timestamps: true }
);

export const ScheduledCommentSchema = mongooseConnection.model<
  IScheduledComment
>('ScheduledComment', scheduledCommentSchema);

import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IComment } from '../../models/interfaces';

const commentSchema: Schema = new Schema(
  {
    entityId: { type: String, required: true },
    comment: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }]
  },
  { timestamps: true }
);

export const CommentSchema = mongooseConnection.model<IComment>(
  'Comment',
  commentSchema
);

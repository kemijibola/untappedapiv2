import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IComment } from '../../models/interfaces';

const replySchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reply: { type: String, required: true }
});

const commentSchema: Schema = new Schema(
  {
    entityId: { type: String, required: true },
    comment: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    replies: [{ type: replySchema }],
    application: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    }
  },
  { timestamps: true }
);

export const CommentSchema = mongooseConnection.model<IComment>(
  'Comment',
  commentSchema
);

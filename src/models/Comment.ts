import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { Comment } from '../interfaces/models';

const commentSchema = new Schema(
  {
    entity: { type: String, required: true },
    comment: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }]
  },
  { timestamps: true }
);

const Comment = mongoose.model<Comment>('Comment', commentSchema);
export default Comment;

import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IComment } from '../../models/interfaces';

class CommentSchema {
  static get schema() {
    const schema = new Schema(
      {
        entity: { type: String, required: true },
        comment: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }]
      },
      { timestamps: true }
    );
    return schema;
  }
}

const schema = mongooseConnection.model<IComment>(
  'Comment',
  CommentSchema.schema
);
export = schema;

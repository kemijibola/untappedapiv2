import MongodataAccess = require('../MongodataAccess');
const mongoose = MongodataAccess.mongooseInstance;
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IComment } from '../../models/interfaces';

class CommentSchema {
  static get schema() {
    const schema = mongoose.Schema(
      {
        entity: { type: String, required: true },
        comment: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }]
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

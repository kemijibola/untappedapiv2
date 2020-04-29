import MongodataAccess = require("../MongodataAccess");
import { Schema } from "mongoose";
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IComment } from "../../models/interfaces";

const replySchema: Schema = new Schema({
  user: { type: String },
  reply: { type: String, required: true },
});

// const likeSchema: Schema = new Schema({
//   user: { type: Schema.Types.ObjectId, ref: "User", required: true }
// });

// likedBy is the userId of the user that liked a comment

const commentSchema: Schema = new Schema(
  {
    entity: { type: String, required: true },
    comment: { type: String, required: true },
    likedBy: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    replies: [{ type: replySchema }],
    application: {
      type: Schema.Types.ObjectId,
      ref: "Application",
    },
  },
  { timestamps: true }
);

export const CommentSchema = mongooseConnection.model<IComment>(
  "Comment",
  commentSchema
);

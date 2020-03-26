"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var replySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    reply: { type: String, required: true }
});
var likeSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }
});
// likedBy is the userId of the user that liked a comment
var commentSchema = new mongoose_1.Schema({
    media: { type: String, required: true },
    comment: { type: String, required: true },
    likedBy: [{ type: likeSchema }],
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    replies: [{ type: replySchema }],
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Application"
    }
}, { timestamps: true });
exports.CommentSchema = mongooseConnection.model("Comment", commentSchema);
//# sourceMappingURL=Comment.js.map
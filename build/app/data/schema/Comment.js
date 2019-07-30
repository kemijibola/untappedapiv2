"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var replySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    reply: { type: String, required: true }
});
var commentSchema = new mongoose_1.Schema({
    entityId: { type: String, required: true },
    comment: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    replies: [{ type: replySchema }],
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    }
}, { timestamps: true });
exports.CommentSchema = mongooseConnection.model('Comment', commentSchema);
//# sourceMappingURL=Comment.js.map
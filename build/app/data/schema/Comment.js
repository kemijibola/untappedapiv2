"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var commentSchema = new mongoose_1.Schema({
    entityId: { type: String, required: true },
    comment: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    replies: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Reply' }]
}, { timestamps: true });
exports.CommentSchema = mongooseConnection.model('Comment', commentSchema);
//# sourceMappingURL=Comment.js.map
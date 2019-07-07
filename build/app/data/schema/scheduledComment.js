"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var scheduledCommentSchema = new mongoose_1.Schema({
    entityId: { type: String, required: true }
}, { timestamps: true });
exports.ScheduledCommentSchema = mongooseConnection.model('ScheduledComment', scheduledCommentSchema);
//# sourceMappingURL=ScheduledComment.js.map
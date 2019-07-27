"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var highestCommentSchema = new mongoose_1.Schema({
    entityId: { type: String, required: true },
    ownerId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    ownerUsername: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    ownerShortBio: { type: String, required: true },
    count: { type: Number, default: 0 }
});
exports.HighestCommentSchema = mongooseConnection.model('HighestComment', highestCommentSchema);
//# sourceMappingURL=HighestComment.js.map
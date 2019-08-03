"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var contestEntrySchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contest: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Contest',
        required: true
    },
    submissionPath: { type: String, required: true },
    voteCount: { type: Number, default: 0 },
    isApproved: { type: Boolean, default: false },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    }
}, { timestamps: true });
exports.ContestEntrySchema = mongooseConnection.model('ContestEntry', contestEntrySchema);
//# sourceMappingURL=ContestEntry.js.map
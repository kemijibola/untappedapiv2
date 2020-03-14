"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var evaluationRatingSchema = new mongoose_1.Schema({
    evaluation: { type: String, required: true },
    rating: { type: Number, default: 0 }
});
var judgeEvaluationSchema = new mongoose_1.Schema({
    judgeName: { type: String, required: true },
    judgeEmail: { type: String, required: true },
    evaluations: [{ type: evaluationRatingSchema, required: true }],
    comment: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now }
});
var contestEntrySchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    contest: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Contest",
        required: true
    },
    submissionPath: { type: String, required: true },
    voteCount: { type: Number, default: 0 },
    isApproved: { type: Boolean, default: false },
    judgeEvaluations: [{ type: judgeEvaluationSchema }],
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Application",
        required: true
    }
}, { timestamps: true });
exports.ContestEntrySchema = mongooseConnection.model("ContestEntry", contestEntrySchema);
//# sourceMappingURL=ContestEntry.js.map
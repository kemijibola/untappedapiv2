"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var interfaces_1 = require("../../models/interfaces");
var evaluationRatingSchema = new mongoose_1.Schema({
    evaluation: { type: String, required: true },
    rating: { type: Number, default: 0 },
});
var judgeEvaluationSchema = new mongoose_1.Schema({
    judgeName: { type: String, required: true },
    judgeEmail: { type: String, required: true },
    evaluations: [{ type: evaluationRatingSchema, required: true }],
    comment: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now },
});
var contestEntrySchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    contest: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Contest",
        required: true,
    },
    likedBy: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    title: { type: String, required: true },
    additionalInfo: { type: String },
    entry: { type: String, required: true },
    contestantCode: { type: String, required: true },
    position: { type: interfaces_1.EntryPosition, default: interfaces_1.EntryPosition.participant },
    prizeRedeemed: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    approvedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    approvedDate: { type: Date },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Application",
    },
}, { timestamps: true });
exports.ContestEntrySchema = mongooseConnection.model("ContestEntry", contestEntrySchema);
//# sourceMappingURL=ContestEntry.js.map
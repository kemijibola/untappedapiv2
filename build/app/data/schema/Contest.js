"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var ContestType;
(function (ContestType) {
    ContestType["Online"] = "Online";
    ContestType["Offline"] = "Offline";
})(ContestType = exports.ContestType || (exports.ContestType = {}));
var evaluationSchema = new mongoose_1.Schema({
    name: { type: String }
});
var redeemableSchema = new mongoose_1.Schema({
    prizeType: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'PrizeType',
        required: true
    },
    winners: [{ type: Number, required: true }]
});
var contestSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    information: { type: String, required: true },
    bannerImage: { type: String },
    eligibleCategories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' }],
    eligibilityInfo: { type: String },
    submissionRules: { type: String },
    startDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    redeemable: redeemableSchema,
    endDate: { type: Date, required: true },
    contestType: { type: ContestType },
    maxContestant: { type: Number },
    grandFinaleDate: { type: Date },
    grandFinaleLocation: { type: String },
    evaluations: [{ type: String }],
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, required: true }
}, { timestamps: true });
exports.ContestSchema = mongooseConnection.model('Contest', contestSchema);
//# sourceMappingURL=Contest.js.map
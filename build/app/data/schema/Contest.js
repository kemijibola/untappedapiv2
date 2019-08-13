"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var interfaces_1 = require("../../models/interfaces");
var Talent_1 = require("./Talent");
var ContestType;
(function (ContestType) {
    ContestType["Online"] = "Online";
    ContestType["OnlineOffline"] = "OnlineOffline";
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
    prizes: [{ type: mongoose_1.Schema.Types.Mixed, required: true }]
});
var judgeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String },
    profile: { type: String, required: true },
    socialMedias: [Talent_1.socialMediaSchema],
    profession: [{ type: String, required: true }],
    judgeProfileImage: { type: String },
    yearsOfExperience: { type: Number, default: 0 }
});
var contestIssueSchema = new mongoose_1.Schema({
    complaintCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'IssueCategory',
        required: true
    },
    complaint: { type: String, required: true, trim: true },
    dateCreated: { type: Date },
    complaintStatus: { type: interfaces_1.ComplaintStatus, default: interfaces_1.ComplaintStatus.Opened }
});
var contestSchema = new mongoose_1.Schema({
    // TODO:: add trim to properties that might have extra spaces
    title: { type: String, required: true, trim: true },
    code: { type: Number, default: 0 },
    information: { type: String, required: true },
    bannerImage: { type: String },
    eligibleCategories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' }],
    eligibilityInfo: { type: String },
    submissionRules: { type: String },
    views: { type: Number, default: 0 },
    entryMediaType: { type: interfaces_1.MediaType, required: true },
    startDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    redeemable: [{ type: redeemableSchema, required: true }],
    endDate: { type: Date, required: true },
    contestType: { type: ContestType },
    maxContestant: { type: Number },
    grandFinaleDate: { type: Date },
    grandFinaleLocation: { type: String },
    evaluations: [{ type: String }],
    judges: [{ type: judgeSchema }],
    paymentStatus: { type: interfaces_1.PaymentStatus, default: interfaces_1.PaymentStatus.UnPaid },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    issues: [{ type: contestIssueSchema }],
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    }
}, { timestamps: true });
exports.ContestSchema = mongooseConnection.model('Contest', contestSchema);
//# sourceMappingURL=Contest.js.map
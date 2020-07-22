"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var interfaces_1 = require("../../models/interfaces");
var Profile_1 = require("./Profile");
var ContestType;
(function (ContestType) {
    ContestType["Online"] = "Online";
    ContestType["OnlineOffline"] = "OnlineOffline";
})(ContestType = exports.ContestType || (exports.ContestType = {}));
var evaluationSchema = new mongoose_1.Schema({
    name: { type: String },
});
var redeemableSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    prizeCash: { type: Number, required: true },
});
var judgeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String },
    profile: { type: String, required: true },
    socialMedias: [Profile_1.socialMediaSchema],
    profession: [{ type: String, required: true }],
    judgeProfileImage: { type: String },
    yearsOfExperience: { type: Number, default: 0 },
});
var contestIssueSchema = new mongoose_1.Schema({
    complaintCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "IssueCategory",
        required: true,
    },
    complaint: { type: String, required: true, trim: true },
    dateCreated: { type: Date },
    complaintStatus: { type: interfaces_1.ComplaintStatus, default: interfaces_1.ComplaintStatus.Opened },
});
var contestSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    code: { type: String },
    information: { type: String, required: true },
    bannerImage: { type: String },
    eligibleCategories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "CategoryType" }],
    eligibilityInfo: { type: String },
    submissionRules: { type: String },
    views: { type: Number, default: 0 },
    likedBy: [{ type: String }],
    entryMediaType: { type: interfaces_1.MediaType, required: true },
    startDate: { type: Date, required: true },
    redeemable: [{ type: redeemableSchema, required: true }],
    endDate: { type: Date, required: true },
    evaluations: [{ type: String }],
    paymentStatus: { type: interfaces_1.PaymentStatus, default: interfaces_1.PaymentStatus.UnPaid },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    issues: [{ type: contestIssueSchema }],
    prizeRedeemed: { type: Boolean, default: false },
    positionsAssigned: { type: Boolean, default: false },
    application: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Application",
    },
}, { timestamps: true });
// contestSchema.index({ title: "text" });
exports.ContestSchema = mongooseConnection.model("Contest", contestSchema);
//# sourceMappingURL=Contest.js.map
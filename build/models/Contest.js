"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var redeemableSchema = new Schema({
    prizeType: { type: Schema.Types.ObjectId, ref: 'PrizeType', required: true },
    winners: [{ type: Number, required: true }]
});
var evaluationSchema = new Schema({
    name: { type: String }
});
var contestSchema = new Schema({
    title: { type: String, required: true },
    information: { type: String, required: true },
    bannerImage: { type: String },
    eligibleCategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    eligibilityInfo: { type: String },
    submissionRules: { type: String },
    startDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    redeemable: redeemableSchema,
    endDate: { type: Date, required: true },
    maxContestant: { type: Number },
    grandFinaleDate: { type: Date },
    grandFinaleLocation: { type: String },
    evaluations: [evaluationSchema],
    createdBy: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: true });
var Contest = mongoose_1.default.model('Contest', contestSchema);
exports.default = Contest;

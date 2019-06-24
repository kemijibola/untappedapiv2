"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.socialMediaSchema = new Schema({
    type: { type: String },
    handles: [{ type: String }]
});
const physicalStatisticsSchema = new Schema({
    height: { type: String },
    bodyType: { type: String },
    color: { type: String }
});
const talentSchema = new Schema({
    stageName: { type: String, required: true },
    location: { type: String, required: true },
    phoneNumber: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    shortBio: { type: String },
    categories: [
        { type: Schema.Types.ObjectId, ref: 'Category', required: true }
    ],
    socialMedias: [exports.socialMediaSchema],
    profileImagePath: { type: String },
    physicalStats: physicalStatisticsSchema
}, { timestamps: true });
const Talent = mongoose_1.default.model('Talent', talentSchema);
exports.default = Talent;

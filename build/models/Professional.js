"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var Talent_1 = require("./Talent");
var professionalSchema = new Schema({
    businessName: { type: String, required: true },
    name: { type: String, required: true },
    officialAddress: { type: String, required: true },
    rcNumber: { type: String },
    phoneNumbers: [{ type: Number, required: true }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    shortBio: { type: String },
    categories: [
        { type: Schema.Types.ObjectId, ref: 'Category', required: true }
    ],
    socialMedias: [Talent_1.socialMediaSchema],
    profileImagePath: { type: String },
    bannerImagePath: { type: String }
}, { timestamps: true });
var Professional = mongoose_1.default.model('Professional', professionalSchema);
exports.default = Professional;

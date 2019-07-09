"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const contestEntrySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    contest: { type: Schema.Types.ObjectId, ref: 'Contest', required: true },
    submissionPath: { type: String, required: true }
}, { timestamps: true });
const ContestEntry = mongoose_1.default.model('ContestEntry', contestEntrySchema);
exports.default = ContestEntry;
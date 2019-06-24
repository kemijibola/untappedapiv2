"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const gigSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    note: { type: String },
    items: [{ type: String }],
    deletedBySender: { type: Boolean, default: false },
    deletedByReciver: { type: Boolean, default: false }
}, { timestamps: true });
const Gig = mongoose_1.default.model('Gig', gigSchema);
exports.default = Gig;

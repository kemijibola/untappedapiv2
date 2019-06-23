"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var gigSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    note: { type: String },
    items: [{ type: String }],
    deletedBySender: { type: Boolean, default: false },
    deletedByReciver: { type: Boolean, default: false }
}, { timestamps: true });
var Gig = mongoose_1.default.model('Gig', gigSchema);
exports.default = Gig;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const commentSchema = new Schema({
    entity: { type: String, required: true },
    comment: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }]
}, { timestamps: true });
const Comment = mongoose_1.default.model('Comment', commentSchema);
exports.default = Comment;

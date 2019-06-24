"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const collectionSchema = new Schema({
    path: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 }
});
const portfolioSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    mediaType: { type: String, required: true },
    uploadType: { type: String, required: true },
    items: [collectionSchema]
}, { timestamps: true });
const Portfolio = mongoose_1.default.model('Portfolio', portfolioSchema);
exports.default = Portfolio;

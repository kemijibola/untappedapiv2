"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var prizeTypeSchema = new Schema({
    name: { type: String, required: true }
}, { timestamps: true });
var PrizeType = mongoose_1.default.model('PrizeType', prizeTypeSchema);
exports.default = PrizeType;

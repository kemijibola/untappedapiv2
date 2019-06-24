"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const resourceSchema = new Schema({
    name: { type: String, required: true }
}, { timestamps: true });
const Resource = mongoose_1.default.model('Resource', resourceSchema);
exports.default = Resource;

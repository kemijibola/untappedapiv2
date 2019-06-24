"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userTypeSchma = new Schema({
    name: { type: String, required: true },
    global: { type: Boolean, required: true, default: false },
    description: { type: String, required: true }
}, { timestamps: true });
const UserType = mongoose_1.default.model('UserType', userTypeSchma);
exports.default = UserType;

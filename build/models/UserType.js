"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var userTypeSchma = new Schema({
    name: { type: String, required: true },
    global: { type: Boolean, required: true, default: false },
    description: { type: String, required: true }
}, { timestamps: true });
var UserType = mongoose_1.default.model('UserType', userTypeSchma);
exports.default = UserType;

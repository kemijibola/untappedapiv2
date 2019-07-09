"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const roleSchema = new Schema({
    name: { type: String, required: true },
    userType: { type: Schema.Types.ObjectId, ref: 'UserType', required: true },
    roleType: { type: String, required: true }
}, { timestamps: true });
const Role = mongoose_1.default.model('Role', roleSchema);
exports.default = Role;
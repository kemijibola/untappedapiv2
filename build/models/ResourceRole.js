"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var resourceRoleSchema = new Schema({
    resource: { type: Schema.Types.ObjectId, ref: 'Resource', required: true },
    role: { type: Schema.Types.ObjectId, ref: 'Role', required: true }
}, { timestamps: true });
var ResourceRole = mongoose_1.default.model('ResourceRole', resourceRoleSchema);
exports.default = ResourceRole;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const resourceRoleSchema = new Schema({
    resource: { type: Schema.Types.ObjectId, ref: 'Resource', required: true },
    role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
    permissions: [
        { type: Schema.Types.ObjectId, ref: 'Permission', required: true }
    ]
}, { timestamps: true });
const ResourcePermission = mongoose_1.default.model('ResourcePermission', resourceRoleSchema);
exports.default = ResourcePermission;

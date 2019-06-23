"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var roleSchema = new Schema({
    name: { type: String, required: true },
    userType: { type: Schema.Types.ObjectId, ref: 'UserType', required: true },
    roleType: { type: String, required: true },
    permissions: [
        { type: Schema.Types.ObjectId, ref: 'Permission', required: true }
    ]
}, { timestamps: true });
var Role = mongoose_1.default.model('Role', roleSchema);
exports.default = Role;

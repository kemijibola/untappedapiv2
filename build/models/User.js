"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var userAccountStatusSchema = new Schema({
    status: { type: String },
    updatedAt: { type: Date }
});
var userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    isEmailConfirmed: { type: Boolean, default: false },
    isPhoneConfirmed: { type: Boolean, default: false },
    isProfileCompleted: { type: Boolean, default: false },
    generalNotification: { type: Boolean, default: true },
    emailNotification: { type: Boolean, default: true },
    profileVisibility: { type: Boolean, default: false },
    loginCount: { type: Number, default: 0 },
    status: userAccountStatusSchema,
    roles: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
    lastLogin: { type: Date }
}, { timestamps: true });
var User = mongoose_1.default.model('User', userSchema);
exports.default = User;

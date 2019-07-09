"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const scheduledEmailSchema = new Schema({
    mailType: { type: String, required: true },
    subject: { type: String },
    body: { type: String, required: true },
    receiverEmail: [{ type: String, required: true }],
    ccCopyEmail: [{ type: String }],
    scheduleDate: { type: Date },
    readyToSend: { type: Boolean, required: true, default: false },
    isPickedForSending: { type: Boolean, required: true, default: false },
    isSent: { type: Boolean, required: true, default: false },
    sentDate: { type: Date },
    errorMessage: { type: String }
}, { timestamps: true });
const ScheduledEmail = mongoose_1.default.model('ScheduledEmail', scheduledEmailSchema);
exports.default = ScheduledEmail;
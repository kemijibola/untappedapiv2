"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var interfaces_1 = require("../../models/interfaces");
var scheduledEmailSchema = new mongoose_1.Schema({
    mailType: { type: interfaces_1.MailType, required: true },
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
exports.ScheduledEmailSchema = mongooseConnection.model('ScheduledEmail', scheduledEmailSchema);
//# sourceMappingURL=ScheduledEmail.js.map
"use strict";
const MongodataAccess = require("../MongodataAccess");
const mongoose_1 = require("mongoose");
const mongooseConnection = MongodataAccess.mongooseConnection;
class ScheduledEmailSchema {
    static get schema() {
        const schema = new mongoose_1.Schema({
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
        return schema;
    }
}
const schema = mongooseConnection.model('ScheduledEmail', ScheduledEmailSchema.schema);
module.exports = schema;

"use strict";
var MongodataAccess = require("../MongodataAccess");
var mongoose_1 = require("mongoose");
var mongooseConnection = MongodataAccess.mongooseConnection;
var ScheduledEmailSchema = /** @class */ (function () {
    function ScheduledEmailSchema() {
    }
    Object.defineProperty(ScheduledEmailSchema, "schema", {
        get: function () {
            var schema = new mongoose_1.Schema({
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
        },
        enumerable: true,
        configurable: true
    });
    return ScheduledEmailSchema;
}());
var schema = mongooseConnection.model('ScheduledEmail', ScheduledEmailSchema.schema);
module.exports = schema;
//# sourceMappingURL=ScheduledEmail.js.map
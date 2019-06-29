"use strict";
var ScheduledEmailModel = /** @class */ (function () {
    function ScheduledEmailModel(scheduledEmailModel) {
        this._scheduledEmailModel = scheduledEmailModel;
    }
    Object.defineProperty(ScheduledEmailModel.prototype, "mailType", {
        get: function () {
            return this._scheduledEmailModel.mailType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScheduledEmailModel.prototype, "subject", {
        get: function () {
            return this._scheduledEmailModel.subject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScheduledEmailModel.prototype, "body", {
        get: function () {
            return this._scheduledEmailModel.body;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScheduledEmailModel.prototype, "receiverEmail", {
        get: function () {
            return this._scheduledEmailModel.receiverEmail;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScheduledEmailModel.prototype, "ccCopyEmail", {
        get: function () {
            return this._scheduledEmailModel.ccCopyEmail;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScheduledEmailModel.prototype, "scheduleDate", {
        get: function () {
            return this._scheduledEmailModel.scheduleDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScheduledEmailModel.prototype, "readyToSend", {
        get: function () {
            return this._scheduledEmailModel.readyToSend;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScheduledEmailModel.prototype, "isPickedForSending", {
        get: function () {
            return this._scheduledEmailModel.isPickedForSending;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScheduledEmailModel.prototype, "isSent", {
        get: function () {
            return this._scheduledEmailModel.isSent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScheduledEmailModel.prototype, "sentDate", {
        get: function () {
            return this._scheduledEmailModel.sentDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScheduledEmailModel.prototype, "errorMessage", {
        get: function () {
            return this._scheduledEmailModel.errorMessage || '';
        },
        enumerable: true,
        configurable: true
    });
    return ScheduledEmailModel;
}());
Object.seal(ScheduledEmailModel);
module.exports = ScheduledEmailModel;
//# sourceMappingURL=ScheduledEmail.js.map
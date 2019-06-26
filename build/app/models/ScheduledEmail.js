"use strict";
class ScheduledEmailModel {
    constructor(scheduledEmailModel) {
        this._scheduledEmailModel = scheduledEmailModel;
    }
    get mailType() {
        return this._scheduledEmailModel.mailType;
    }
    get subject() {
        return this._scheduledEmailModel.subject;
    }
    get body() {
        return this._scheduledEmailModel.body;
    }
    get receiverEmail() {
        return this._scheduledEmailModel.receiverEmail;
    }
    get ccCopyEmail() {
        return this._scheduledEmailModel.ccCopyEmail;
    }
    get scheduleDate() {
        return this._scheduledEmailModel.scheduleDate;
    }
    get readyToSend() {
        return this._scheduledEmailModel.readyToSend;
    }
    get isPickedForSending() {
        return this._scheduledEmailModel.isPickedForSending;
    }
    get isSent() {
        return this._scheduledEmailModel.isSent;
    }
    get sentDate() {
        return this._scheduledEmailModel.sentDate;
    }
    get errorMessage() {
        return this._scheduledEmailModel.errorMessage || '';
    }
}
Object.seal(ScheduledEmailModel);
module.exports = ScheduledEmailModel;

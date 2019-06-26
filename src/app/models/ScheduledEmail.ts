import { IScheduledEmail, MailType } from './interfaces';

class ScheduledEmailModel {
  private _scheduledEmailModel: IScheduledEmail;
  constructor(scheduledEmailModel: IScheduledEmail) {
    this._scheduledEmailModel = scheduledEmailModel;
  }

  get mailType(): MailType {
    return this._scheduledEmailModel.mailType;
  }
  get subject(): string {
    return this._scheduledEmailModel.subject;
  }
  get body(): string {
    return this._scheduledEmailModel.body;
  }
  get receiverEmail(): string[] {
    return this._scheduledEmailModel.receiverEmail;
  }
  get ccCopyEmail(): string[] {
    return this._scheduledEmailModel.ccCopyEmail;
  }
  get scheduleDate(): Date {
    return this._scheduledEmailModel.scheduleDate;
  }
  get readyToSend(): boolean {
    return this._scheduledEmailModel.readyToSend;
  }
  get isPickedForSending(): boolean {
    return this._scheduledEmailModel.isPickedForSending;
  }
  get isSent(): boolean {
    return this._scheduledEmailModel.isSent;
  }
  get sentDate(): Date {
    return this._scheduledEmailModel.sentDate;
  }
  get errorMessage(): string {
    return this._scheduledEmailModel.errorMessage || '';
  }
}

Object.seal(ScheduledEmailModel);
export = ScheduledEmailModel;

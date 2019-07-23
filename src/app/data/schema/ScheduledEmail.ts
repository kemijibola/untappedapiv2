import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IScheduledEmail, MailType } from '../../models/interfaces';

const scheduledEmailSchema: Schema = new Schema(
  {
    mailType: { type: MailType, required: true },
    subject: { type: String },
    senderEmail: { type: String, required: true },
    senderName: { type: String, required: true },
    body: { type: String, required: true },
    receiverEmail: { type: String, required: true },
    ccCopyEmail: [{ type: String }],
    scheduleDate: { type: Date },
    readyToSend: { type: Boolean, default: false },
    isPickedForSending: { type: Boolean, default: false },
    isSent: { type: Boolean, default: false },
    sentDate: { type: Date },
    errorMessage: { type: String }
  },
  { timestamps: true }
);

export const ScheduledEmailSchema = mongooseConnection.model<IScheduledEmail>(
  'ScheduledEmail',
  scheduledEmailSchema
);

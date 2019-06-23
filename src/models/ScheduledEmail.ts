import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { ScheduledEmail } from '../interfaces/models';

const scheduledEmailSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

const ScheduledEmail = mongoose.model<ScheduledEmail>(
  'ScheduledEmail',
  scheduledEmailSchema
);
export default ScheduledEmail;

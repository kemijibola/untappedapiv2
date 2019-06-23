import mongoose from 'mongoose';
import { TimeStamp } from './Timestamp';

enum MailType {
  MARKETING = 'MARKETING',
  TRANSACTIONAL = 'TRANSACTIONAL',
  NOTIFICATION = 'NOTIFICATION'
}

export interface ScheduledEmail extends TimeStamp, mongoose.Document {
  mailType: MailType;
  subject: string;
  body: string;
  receiverEmail: string[];
  ccCopyEmail: string[];
  scheduleDate: Date;
  readyToSend: boolean;
  isPickedForSending: boolean;
  isSent: boolean;
  sentDate: Date;
  errorMessage?: string;
}

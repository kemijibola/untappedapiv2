import mongoose from 'mongoose';
import { ITimeStamp } from './Timestamp';

export enum MailType {
  MARKETING = 'MARKETING',
  TRANSACTIONAL = 'TRANSACTIONAL',
  NOTIFICATION = 'NOTIFICATION'
}

export interface IScheduledEmail extends ITimeStamp, mongoose.Document {
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

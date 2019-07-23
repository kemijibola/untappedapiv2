import { MailType } from '../interfaces';

export interface SignUpEmailViewModel {
  mailType: MailType;
  subject: string;
  senderEmail: string;
  senderName: string;
  body: string;
  receiverEmail: string;
  scheduleDate: Date;
  readyToSend: boolean;
}

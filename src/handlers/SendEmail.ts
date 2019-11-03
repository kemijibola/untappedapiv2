import { Handler, Context } from 'aws-lambda';
import { EmailService, IEmail } from '../utils/emailservice/EmailService';
import { ses } from '../utils/emailservice/aws/Sender';
import { escapeJSON } from '../utils/lib';

let mailParams: IEmail = {
  receivers: [],
  subject: '',
  mail: '',
  senderEmail: '',
  senderName: ''
};

export const handle: Handler = async (
  event: any = {},
  context: Context
): Promise<any> => {
  try {
    let escapeReceivers: string[] = [];
    let escapesubject: string;
    let escapebody: string;
    let escapesenderEmail: string;
    let escapeCcAddresses: string[] = [];
    let escapebbccAddresses: string[] = [];
    let escapeSenderName = '';

    const body = event.data;

    escapesubject = JSON.parse(escapeJSON(body.subject));
    escapebody = JSON.parse(escapeJSON(body.mail));
    escapesenderEmail = JSON.parse(escapeJSON(body.senderEmail));

    body.receivers = escapeJSON(body.receivers).split(',');
    for (let email of body.receivers) {
      escapeReceivers = [...escapeReceivers, JSON.parse(email)];
    }

    if (body.ccAddresses) {
      body.ccAddresses = escapeJSON(body.ccAddresses).split(',');
      for (let email of body.ccAddresses) {
        escapeCcAddresses = [...escapeCcAddresses, JSON.parse(email)];
      }
    }
    if (body.bccAddresses) {
      body.bccAddresses = escapeJSON(body.bccAddresses).split(',');
      for (let email of body.ccAddresses) {
        escapebbccAddresses = [...escapebbccAddresses, JSON.parse(email)];
      }
    }
    if (body.senderName) {
      escapeSenderName = JSON.parse(escapeJSON(body.senderName));
    }

    mailParams = {
      receivers: escapeReceivers,
      subject: escapesubject,
      mail: escapebody,
      senderEmail: escapesenderEmail,
      ccAddresses: escapeCcAddresses,
      bccAddresses: escapebbccAddresses,
      senderName: escapeSenderName
    };
    const mailer = EmailService.mailer(mailParams);
    await mailer.sendMail(ses);
  } catch (err) {}
};

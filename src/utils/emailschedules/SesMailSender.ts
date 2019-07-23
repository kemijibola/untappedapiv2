import * as AWS from 'aws-sdk';
const ses = new AWS.SES();
import { IEmailScheduler, IEmail } from './base/EmailScheduler';
import { IEmailHandler } from './ScheduleEmail';

export class SesMailSender implements IEmailScheduler {
  constructor() {}

  static setUp(): SesMailSender {
    return new SesMailSender();
  }
  async sendEmail(email: IEmail): Promise<string> {
    const params = {
      Destination: {
        ToAddresses: email.receivers
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: email.htmlBody
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: email.subject
        }
      },
      ReplyToAddresses: [],
      Source: email.senderEmail
    };

    const result = await ses.sendEmail(params);
    return JSON.stringify(result);
  }
}

async function sendMail(event: IEmailHandler) {
  const sender = await SesMailSender.setUp();
  const result = sender.sendEmail(event.email);
  console.log('Sent email successfully', result);
  return result;
}

export default {
  handle: sendMail
};

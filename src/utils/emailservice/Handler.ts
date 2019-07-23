import { APIGatewayEvent, Handler } from 'aws-lambda';
import { EmailService, IEmail } from './EmailService';
import * as qs from 'querystring';
import { ses } from './aws/Sender';

import * as AWS from 'aws-sdk';
AWS.config.update({ region: 'us-east-1' });

const awsSes = new AWS.SES({ region: 'us-east-1' });

let mailParams: IEmail = {
  receivers: [],
  subject: '',
  body: '',
  senderEmail: '',
  senderName: ''
};

export const mailHandler: Handler = async (event): Promise<any> => {
  try {
    //console.log(event);
    //mailParams = Object.assign(mailParams, event.mail);

    const mailer = EmailService.mailer(event.mail);
    const result = await mailer.sendMail(ses);
    console.log('Sent email successfully', result);
    return mailParams;
    //console.log('Received event:', JSON.stringify(event, null, 2));
    // if (event.body) {
    //   const parsedData: IEmail = JSON.parse(event.body.toString());
    //   const mailer = EmailService.mailer(parsedData);
    //   const result = await mailer.sendMail(ses);
    //   console.log('Sent email successfully', result);
    //   return result;
    // }
  } catch (err) {
    console.log(err);
  }
};

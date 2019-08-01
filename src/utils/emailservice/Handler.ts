import { APIGatewayEvent, Handler, Context, Callback } from 'aws-lambda';
import { EmailService, IEmail } from './EmailService';
import { ses } from './aws/Sender';

import * as AWS from 'aws-sdk';
import { escapeJSON } from '../lib';
AWS.config.update({ region: 'us-east-1' });


let mailParams: IEmail = {
  receivers: [],
  subject: '',
  mail: '',
  senderEmail: '',
  senderName: ''
};

export const mailHandler: Handler = async (
  event: any = {},
  context: Context,
  cb: Callback
): Promise<any> => {
  const headers = { 'Access-Control-Allow-Origin': '*' };
  try {
    // const fromJson = event.email;
    // let data = escapeJSON(fromJson.receivers);
    // const parsed = JSON.parse(data);
    let escapeReceivers: string[] = [];
    let escapesubject: string;
    let escapebody: string;
    let escapesenderEmail: string;
    let escapeCcAddresses: string[] = [];
    let escapebbccAddresses: string[] = [];
    let escapeSenderName = '';

    const body = event.email;

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
    const result = await mailer.sendMail(ses);
    cb(null, {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ message: result })
    });
  } catch (err) {
    cb(null, {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ error: err })
    });
  }
};

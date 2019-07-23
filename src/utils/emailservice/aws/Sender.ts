import * as AWS from 'aws-sdk';

import { Sender } from '../EmailService';
const awsSes = new AWS.SES();

export const ses: Sender = async (
  receivers: string[],
  subject: string,
  body: string,
  senderEmail: string,
  ccAddresses?: string[],
  bccAddresses?: string[]
): Promise<any> => {
  const charset = 'UTF-8';
  const params = {
    Destination: {
      ToAddresses: receivers,
      CcAddresses: ccAddresses || [],
      BccAddresses: bccAddresses || []
    },
    Message: {
      Body: {
        Html: {
          Charset: charset,
          Data: body
        },
        Text: { Charset: charset, Data: body }
      },
      Subject: {
        Charset: charset,
        Data: subject
      }
    },
    ReplyToAddresses: [],
    Source: senderEmail
  };
  const result = await awsSes.sendEmail(params);
  console.log('sent successfully');
  return JSON.stringify(result);
};

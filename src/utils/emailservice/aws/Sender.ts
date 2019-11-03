import * as AWS from 'aws-sdk';
import { AppConfig } from '../../../app/models/interfaces/custom/AppConfig';
const config: AppConfig = module.require('../../../config/keys');

AWS.config.update({
  accessKeyId: config.SERVERLESS.access_key_id,
  secretAccessKey: config.SERVERLESS.secret_access_key,
  region: 'us-east-1'
});

const awsSes = new AWS.SES({ region: 'us-east-1' });
import { Sender } from '../EmailService';

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

  return await awsSes.sendEmail(params).promise();
};

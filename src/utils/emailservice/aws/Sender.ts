import * as AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'AKIAUHX2MMXUCQ64RPPY',
  secretAccessKey: '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',
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

import * as AWS from 'aws-sdk';
import { IEmail } from './base/EmailScheduler';
const stepfunctions = new AWS.StepFunctions();

export interface IEmailHandler {
  dueDate: Date;
  email: IEmail;
}

async function scheduleEmail(params: IEmailHandler) {
  const stateMachineArn = process.env.STATEMACHINE_ARN || '';
  const { dueDate, email } = params;
  const result = await stepfunctions
    .startExecution({
      stateMachineArn,
      input: JSON.stringify({
        dueDate,
        email
      })
    })
    .promise();
  return result;
}

export default {
  handle: scheduleEmail
};

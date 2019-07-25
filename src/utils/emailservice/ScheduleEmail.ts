import * as AWS from 'aws-sdk';
AWS.config.update({ region: 'us-east-1' });
const stepfunctions = new AWS.StepFunctions();
import { IEmail } from './EmailService';

declare module 'aws-lambda' {
  interface APIGatewayProxyEvent {
    dueDate: Date;
    email: any;
  }
}

export type ScheduleSenderParam = (dueDate: Date, mail: IEmail) => Promise<any>;

export const scheduleEmail: ScheduleSenderParam = async (
  dueDate: Date,
  email: IEmail
): Promise<any> => {
  try {
    const stateMachineArn = `arn:aws:states:us-east-1:291509134824:stateMachine:EmailSchedulingStateMachine`;
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
  } catch (err) {}
};

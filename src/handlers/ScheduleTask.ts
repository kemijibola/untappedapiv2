import * as AWS from 'aws-sdk';
import { AppConfig } from '../app/models/interfaces/custom/AppConfig';
const config: AppConfig = module.require('../config/keys');

AWS.config.update({
  accessKeyId: config.SERVERLESS.access_key_id,
  secretAccessKey: config.SERVERLESS.secret_access_key,
  region: 'us-east-1'
});

const stepfunctions = new AWS.StepFunctions({ region: 'us-east-1' });

declare module 'aws-lambda' {
  interface APIGatewayProxyEvent {
    dueDate: Date;
    data: any;
  }
}

export type TaskScheduler = (
  stateMachineArn: string,
  dueDate: Date,
  data: any
) => Promise<any>;

export const schedule: TaskScheduler = async (
  stateMachine: string,
  dueDate: Date,
  data: any
): Promise<any> => {
  try {
    const stateMachineArn =
      'arn:aws:states:us-east-1:291509134824:stateMachine:EmailSchedulingStateMachine';
    return await stepfunctions
      .startExecution({
        stateMachineArn,
        input: JSON.stringify({
          dueDate,
          data
        })
      })
      .promise();
  } catch (err) {
    console.log('Error', err);
  }
};

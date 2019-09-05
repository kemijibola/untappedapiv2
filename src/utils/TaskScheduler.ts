import * as AWS from 'aws-sdk';
AWS.config.update({ region: 'us-east-1' });
const stepfunctions = new AWS.StepFunctions();

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
  stateMachineArn: string,
  dueDate: Date,
  data: any
): Promise<any> => {
  try {
    return await stepfunctions
      .startExecution({
        stateMachineArn,
        input: JSON.stringify({
          dueDate,
          data
        })
      })
      .promise();
  } catch (err) {}
};

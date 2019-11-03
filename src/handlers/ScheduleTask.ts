import * as AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'AKIAUHX2MMXUCQ64RPPY',
  secretAccessKey: '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',
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

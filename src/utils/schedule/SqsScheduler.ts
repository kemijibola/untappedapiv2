import { IScheduler } from './base/Scheduler';
import * as AWS from 'aws-sdk';

export interface SqsParams {
  region: string;
  version: string;
  accountId: string;
}

export interface SqsSendMessage {
  MessageBody: string;
  QueueUrl: string;
}

export interface SqsReceiveMessage {
  QueueUrl: string;
  MaxNumberOfMessages: number;
  VisibilityTimeout: number;
  WaitTimeSeconds: number;
}

export interface DeleteParams {
  QueueUrl: string;
  ReceiptHandle: string;
}

export class SqsScheduler implements IScheduler {
  private sqs: AWS.SQS;
  private accountId: string = '';
  private sendMessageParams: { MessageBody: string; QueueUrl: string } = {
    MessageBody: '',
    QueueUrl: ''
  };
  private recieveParams: SqsReceiveMessage = {
    QueueUrl: '',
    MaxNumberOfMessages: 0,
    VisibilityTimeout: 0,
    WaitTimeSeconds: 0
  };
  private deleteParams: DeleteParams = { QueueUrl: '', ReceiptHandle: '' };
  private dataToProcess: {} = {};

  constructor(private config: SqsParams) {
    AWS.config.update({
      region: config.region
    });

    this.sqs = new AWS.SQS({
      apiVersion: config.version
    });

    this.accountId = config.accountId;
  }

  static setup(config: SqsParams): SqsScheduler {
    return new SqsScheduler(config);
  }

  create<SqsSendMessage>(name: string, createParams: SqsSendMessage): void {
    this.sendMessageParams = Object.assign(
      this.sendMessageParams,
      createParams
    );
    this.sendMessageParams = {
      MessageBody: this.sendMessageParams.MessageBody,
      QueueUrl: `${this.sendMessageParams.QueueUrl}/${this.accountId}/${name}`
    };
    this.sqs.sendMessage(this.sendMessageParams, (err: any, data: any) => {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Successfully added message', data.MessageId);
      }
    });
  }

  process<ReceiveMessage>(name: string, processParams: ReceiveMessage): any {
    this.recieveParams = Object.assign(this.recieveParams, processParams);
    this.recieveParams = {
      QueueUrl: `${this.recieveParams.QueueUrl}/${this.accountId}/${name}`,
      MaxNumberOfMessages: this.recieveParams.MaxNumberOfMessages,
      VisibilityTimeout: this.recieveParams.VisibilityTimeout,
      WaitTimeSeconds: this.recieveParams.WaitTimeSeconds
    };
    this.sqs.receiveMessage(this.recieveParams, (err: any, data: any) => {
      if (err) {
        console.log(err.stack);
      } else {
        if (!data.Message) {
          console.log('Nothing to process');
          return Object();
        }
        this.dataToProcess = JSON.parse(data.Messages[0].Body);
      }
    });
    return this.dataToProcess;
  }

  delete<DeleteParams>(params: DeleteParams): void {
    this.deleteParams = Object.assign(this.deleteParams, params);
    this.sqs.deleteMessage(this.deleteParams, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log('Successfully deleted message from queue');
      }
    });
  }
}

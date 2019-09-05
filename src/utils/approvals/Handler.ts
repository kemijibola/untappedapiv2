import { APIGatewayEvent, Handler, Context, Callback } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { escapeJSON } from '../lib';
import { IApproval } from '../../app/models/interfaces';
import { ApprovalService } from './ApprovalService';
import { approve } from './requests/Approver';

AWS.config.update({ region: 'us-east-1' });

export const approvalHandler: Handler = async (
  event: any = {},
  context: Context
): Promise<any> => {
  try {
    const body = event.data;

    let entity = JSON.parse(escapeJSON(body.entity));
    let operation = JSON.parse(escapeJSON(body.operation));
    let application = JSON.parse(escapeJSON(body.subject));

    const approvalParams: IApproval = Object.assign({
      entity,
      operation,
      application
    });

    const approver = ApprovalService.approver(approvalParams);
    await approver.createApproval(approve);
  } catch (err) {
    //log error
  }
};

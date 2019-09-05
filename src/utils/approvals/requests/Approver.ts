import { Approval } from '../ApprovalService';
import { ApprovalOperations, IApproval } from '../../../app/models/interfaces';
import ApprovalBusiness = require('../../../app/business/ApprovalBusiness');

export const approve: Approval = async (
  entity: string,
  operation: ApprovalOperations,
  application: string
): Promise<void> => {
  // perform database save operation to create
  // approval request
  const item: IApproval = Object.assign({
    entity: entity,
    operation: operation,
    application: application
  });
  const approvalBusiness = new ApprovalBusiness();
  await approvalBusiness.create(item);
};

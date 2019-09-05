import { ApprovalOperations, IApproval } from '../../app/models/interfaces';

export type Approval = (
  entity: string,
  operation: ApprovalOperations,
  application: string
) => Promise<void>;

export class ApprovalService {
  constructor(public params: IApproval) {}

  static approver(params: IApproval): ApprovalService {
    return new ApprovalService(params);
  }

  async createApproval(approve: Approval): Promise<void> {
    return approve(
      this.params.entity,
      this.params.operation,
      this.params.application
    );
  }
}

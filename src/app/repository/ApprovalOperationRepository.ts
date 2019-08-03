import { IApprovalOperation } from '../models/interfaces';
import { ApprovalOperationSchema } from '../data/schema/ApprovalOperation';
import RepositoryBase from './base/RepositoryBase';

class ApprovalOperationRepository extends RepositoryBase<IApprovalOperation> {
  constructor() {
    super(ApprovalOperationSchema);
  }
}

Object.seal(ApprovalOperationRepository);
export = ApprovalOperationRepository;

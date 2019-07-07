import { IApproval } from '../models/interfaces';
import { ApprovalSchema } from '../data/schema/Approvals';
import RepositoryBase from './base/RepositoryBase';

class AprovalRepository extends RepositoryBase<IApproval> {
  constructor() {
    super(ApprovalSchema);
  }
}

Object.seal(AprovalRepository);
export = AprovalRepository;

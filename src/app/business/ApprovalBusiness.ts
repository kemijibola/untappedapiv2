import ApprovalRepository from '../repository/ApprovalRepository';
import IApprovalBusiness = require('./interfaces/ApprovalBusiness');
import { IApproval } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';

class ApprovalBusiness implements IApprovalBusiness {
  private _approvalRepository: ApprovalRepository;

  constructor() {
    this._approvalRepository = new ApprovalRepository();
  }

  fetch(): Promise<IApproval> {
    return this._approvalRepository.fetch();
  }

  findById(id: string): Promise<IApproval> {
    return this._approvalRepository.findById(id);
  }

  findByCriteria(criteria: any): Promise<IApproval> {
    return this.findByCriteria(criteria);
  }

  create(item: IApproval): Promise<IApproval> {
    return this._approvalRepository.create(item);
  }

  async update(id: string, item: IApproval): Promise<IApproval> {
    const approvalModel = await this._approvalRepository.findById(id);
    if (!approvalModel)
      throw new RecordNotFound(`Approval with id: ${id} not found`, 404);
    return this._approvalRepository.update(approvalModel._id, item);
  }

  delete(id: string): Promise<boolean> {
    return this._approvalRepository.delete(id);
  }
}

Object.seal(ApprovalBusiness);
export = ApprovalBusiness;

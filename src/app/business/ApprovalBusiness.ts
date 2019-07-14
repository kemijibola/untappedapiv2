import ApprovalRepository from '../repository/ApprovalRepository';
import IApprovalBusiness = require('./interfaces/ApprovalBusiness');
import { IApproval } from '../models/interfaces';
import { Result } from '../../utils/Result';

class ApprovalBusiness implements IApprovalBusiness {
  private _approvalRepository: ApprovalRepository;

  constructor() {
    this._approvalRepository = new ApprovalRepository();
  }

  async fetch(): Promise<Result<IApproval>> {
    try {
      const approvals = await this._approvalRepository.fetch();
      return Result.ok<IApproval>(200, approvals);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IApproval>> {
    try {
      if (!id) return Result.fail<IApproval>(400, 'Invalid id');
      const approval = await this._approvalRepository.findById(id);
      if (!approval)
        return Result.fail<IApproval>(404, `Approval of Id ${id} not found`);
      else return Result.ok<IApproval>(200, approval);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IApproval>> {
    try {
      const approval = await this._approvalRepository.findByCriteria(criteria);
      if (!approval) return Result.fail<IApproval>(404, `Approval not found`);
      else return Result.ok<IApproval>(200, approval);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: IApproval): Promise<Result<IApproval>> {
    try {
      const newApproval = await this._approvalRepository.create(item);
      return Result.ok<IApproval>(201, newApproval);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(id: string, item: IApproval): Promise<Result<IApproval>> {
    try {
      const approval = await this._approvalRepository.findById(id);
      if (!approval)
        return Result.fail<IApproval>(
          404,
          `Could not update approval.Approval of Id ${id} not found`
        );
      const updateObj = await this._approvalRepository.update(
        approval._id,
        item
      );
      return Result.ok<IApproval>(200, updateObj);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._approvalRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(ApprovalBusiness);
export = ApprovalBusiness;

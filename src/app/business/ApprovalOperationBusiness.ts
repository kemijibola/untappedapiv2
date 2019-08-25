import ApprovalOperationRepository from '../repository/ApprovalOperationRepository';
import IApprovalOperationBusiness = require('./interfaces/ApprovalOperationBusiness');
import { IApprovalOperation } from '../models/interfaces';
import { Result } from '../../utils/Result';

class ApprovalOperationBusiness implements IApprovalOperationBusiness {
  private _approvalOperationRepository: ApprovalOperationRepository;

  constructor() {
    this._approvalOperationRepository = new ApprovalOperationRepository();
  }

  async fetch(condition: any): Promise<Result<IApprovalOperation[]>> {
    try {
      const approvalOperations = await this._approvalOperationRepository.fetch(
        condition
      );
      return Result.ok<IApprovalOperation[]>(200, approvalOperations);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IApprovalOperation>> {
    try {
      if (!id) return Result.fail<IApprovalOperation>(400, 'Bad request.');
      const approvalOperation = await this._approvalOperationRepository.findById(
        id
      );
      if (!approvalOperation)
        return Result.fail<IApprovalOperation>(
          404,
          `Approval operation of Id ${id} not found`
        );
      else return Result.ok<IApprovalOperation>(200, approvalOperation);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findOne(condition: any): Promise<Result<IApprovalOperation>> {
    try {
      if (!condition)
        return Result.fail<IApprovalOperation>(400, 'Bad request.');
      const approvalOperation = await this._approvalOperationRepository.findByOne(
        condition
      );
      if (!approvalOperation)
        return Result.fail<IApprovalOperation>(
          404,
          `Approval operation not found`
        );
      else return Result.ok<IApprovalOperation>(200, approvalOperation);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IApprovalOperation>> {
    try {
      const approvalOperation = await this._approvalOperationRepository.findByCriteria(
        criteria
      );
      if (!approvalOperation)
        return Result.fail<IApprovalOperation>(
          404,
          `Approval operation not found`
        );
      else return Result.ok<IApprovalOperation>(200, approvalOperation);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: IApprovalOperation): Promise<Result<IApprovalOperation>> {
    try {
      const approvalOperation = await this._approvalOperationRepository.findByCriteria(
        {
          name: item.name
        }
      );
      if (approvalOperation === null) {
        const newApprovalOperation = await this._approvalOperationRepository.create(
          item
        );
        return Result.ok<IApprovalOperation>(201, newApprovalOperation);
      }
      return Result.fail<IApprovalOperation>(
        400,
        `Approval operation with name ${approvalOperation.name} exists.`
      );
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(
    id: string,
    item: IApprovalOperation
  ): Promise<Result<IApprovalOperation>> {
    try {
      const approvalOperation = await this._approvalOperationRepository.findById(
        id
      );
      if (!approvalOperation)
        return Result.fail<IApprovalOperation>(
          404,
          `Could not update approval operation.Approval operation with Id ${id} not found`
        );
      const updateObj = await this._approvalOperationRepository.update(
        approvalOperation._id,
        item
      );
      return Result.ok<IApprovalOperation>(200, updateObj);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._approvalOperationRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(ApprovalOperationBusiness);
export = ApprovalOperationBusiness;

import ApprovalOperationRepository from "../repository/ApprovalOperationRepository";
import IApprovalOperationBusiness = require("./interfaces/ApprovalOperationBusiness");
import { IApprovalOperation } from "../models/interfaces";
import { Result } from "../../utils/Result";

class ApprovalOperationBusiness implements IApprovalOperationBusiness {
  private _approvalOperationRepository: ApprovalOperationRepository;

  constructor() {
    this._approvalOperationRepository = new ApprovalOperationRepository();
  }

  async fetch(condition: any): Promise<Result<IApprovalOperation[]>> {
    const approvalOperations = await this._approvalOperationRepository.fetch(
      condition
    );
    return Result.ok<IApprovalOperation[]>(200, approvalOperations);
  }

  async findById(id: string): Promise<Result<IApprovalOperation>> {
    if (!id) return Result.fail<IApprovalOperation>(400, "Bad request.");
    const approvalOperation = await this._approvalOperationRepository.findById(
      id
    );
    if (!approvalOperation)
      return Result.fail<IApprovalOperation>(
        404,
        `Approval operation of Id ${id} not found`
      );
    else return Result.ok<IApprovalOperation>(200, approvalOperation);
  }

  async findOne(condition: any): Promise<Result<IApprovalOperation>> {
    if (!condition) return Result.fail<IApprovalOperation>(400, "Bad request.");
    const approvalOperation = await this._approvalOperationRepository.findByOne(
      condition
    );
    if (!approvalOperation)
      return Result.fail<IApprovalOperation>(
        404,
        `Approval operation not found`
      );
    return Result.ok<IApprovalOperation>(200, approvalOperation);
  }

  async findByCriteria(criteria: any): Promise<Result<IApprovalOperation>> {
    const approvalOperation = await this._approvalOperationRepository.findByCriteria(
      criteria
    );
    if (!approvalOperation)
      return Result.fail<IApprovalOperation>(
        404,
        `Approval operation not found`
      );
    return Result.ok<IApprovalOperation>(200, approvalOperation);
  }

  async create(item: IApprovalOperation): Promise<Result<IApprovalOperation>> {
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
  }

  async update(
    id: string,
    item: IApprovalOperation
  ): Promise<Result<IApprovalOperation>> {
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
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._approvalOperationRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(ApprovalOperationBusiness);
export = ApprovalOperationBusiness;

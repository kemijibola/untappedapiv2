import ApprovalRepository from '../repository/ApprovalRepository';
import ApprovalOperationRepository from '../repository/ApprovalOperationRepository';
import IApprovalBusiness = require('./interfaces/ApprovalBusiness');
import { IApproval } from '../models/interfaces';
import { Result } from '../../utils/Result';

class ApprovalBusiness implements IApprovalBusiness {
  private _approvalRepository: ApprovalRepository;
  private _approvalOperationRepository: ApprovalOperationRepository;

  constructor() {
    this._approvalRepository = new ApprovalRepository();
    this._approvalOperationRepository = new ApprovalOperationRepository();
  }

  async fetch(condition: any): Promise<Result<IApproval[]>> {
    try {
      const approvals = await this._approvalRepository.fetch(condition);
      return Result.ok<IApproval[]>(200, approvals);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IApproval>> {
    try {
      if (!id) return Result.fail<IApproval>(400, 'Bad request.');
      const approval = await this._approvalRepository.findById(id);
      if (!approval)
        return Result.fail<IApproval>(404, `Approval of Id ${id} not found`);
      else return Result.ok<IApproval>(200, approval);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findOne(condition: any): Promise<Result<IApproval>> {
    try {
      if (!condition) return Result.fail<IApproval>(400, 'Bad request.');
      const approval = await this._approvalRepository.findByOne(condition);
      if (!approval) return Result.fail<IApproval>(404, `Approval not found`);
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
      const approvalOperation = await this._approvalOperationRepository.findById(
        item.approvalOperation
      );
      if (approvalOperation === null) {
        return Result.fail<IApproval>(
          400,
          `Approval operation ${item.approvalOperation} is invalid.`
        );
      }
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
          `Could not update approval.Approval with Id ${id} not found`
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

  // async patch(id: string, item: any): Promise<Result<UserViewModel>> {
  //   try {
  //     const user = await this._approvalRepository.findById(id);
  //     if (!user)
  //       return Result.fail<UserViewModel>(
  //         404,
  //         `Could not update user.User with Id ${id} not found`
  //       );
  //     const updateObj = await this._userRepository.update(user._id, item);
  //     // console.log(updateObj.);
  //     let refinedUser: UserViewModel = {
  //       _id: updateObj._id,
  //       email: updateObj.email,
  //       name: updateObj.username,
  //       profileImagePath: updateObj.profileImagePath,
  //       isEmailConfirmed: updateObj.isEmailConfirmed,
  //       isPhoneConfirmed: updateObj.isPhoneConfirmed,
  //       isProfileCompleted: updateObj.isProfileCompleted,
  //       generalNotification: updateObj.generalNotification,
  //       emailNotification: updateObj.emailNotification,
  //       profileVisibility: updateObj.profileVisibility,
  //       loginCount: updateObj.loginCount,
  //       status: [updateObj.status],
  //       roles: updateObj.roles,
  //       lastLogin: updateObj.lastLogin,
  //       createdAt: updateObj.createdAt
  //     };
  //     return Result.ok<UserViewModel>(200, refinedUser);
  //   } catch (err) {
  //     throw new Error(`InternalServer error occured.${err.message}`);
  //   }
  // }

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

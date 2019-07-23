import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators } from '../decorators';
import ApprovalRepository = require('../app/repository/ApprovalRepository');
import { IApproval } from '../app/models/interfaces';
import ApprovalBusiness from '../app/business/ApprovalBusiness';
import BaseController from './interfaces/base/BaseController';
import { PlatformError } from '../utils/error';

@controller('/v1/approvals')
class ApprovalController {
  @post('/')
  @requestValidators('entity', 'operation', 'approved')
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item: IApproval = req.body;
      const approvalBusiness = new ApprovalBusiness();
      const result = await approvalBusiness.create(item);
      if (result.error) {
        return PlatformError.error({
          code: result.responseCode,
          message: `Error occured. ${result.error}`
        });
      }
      return res.status(200).json({
        message: 'Operation Successful',
        data: result.data
      });
    } catch (err) {
      //next(new InternalServerError('Internal Server error occured', 500));
    }
  }
  update(req: Request, res: Response, next: NextFunction): void {}
  delete(req: Request, res: Response, next: NextFunction): void {}
  fetch(req: Request, res: Response, next: NextFunction): void {}
  findById(req: Request, res: Response, next: NextFunction) {}
}

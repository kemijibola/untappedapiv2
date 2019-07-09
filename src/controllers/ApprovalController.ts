import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators } from '../decorators';
import IBaseController from './interfaces/base/BaseController';
import ApprovalRepository = require('../app/repository/ApprovalRepository');
import { IApproval } from '../app/models/interfaces';
import { RecordExists, InternalServerError } from '../utils/error';

@controller('./approvals')
class ApprovalController implements IBaseController {
  @post('/')
  @requestValidators('entity', 'operation', 'approved')
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item: IApproval = req.body;
      const approval = await new ApprovalRepository().create(item);
      return res.status(201).json({
        message: 'Operation successful',
        data: approval
      });
    } catch (err) {
      next(new InternalServerError('Internal Server error occured', 500));
    }
  }
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}

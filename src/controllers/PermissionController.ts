import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators } from '../decorators';
import { IPermission } from '../app/models/interfaces';
import { PlatformError } from '../utils/error';
import PermissionBusiness = require('../app/business/PermissionBusiness');

@controller('/v1/permissions')
export class PermissionController {
  @post('/')
  @requestValidators('name', 'role')
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item: IPermission = req.body;
      const permissionBusiness = new PermissionBusiness();
      const result = await permissionBusiness.create(item);
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error
          })
        );
      }
      return res.status(201).json({
        message: 'Operation successful',
        data: result.data
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: 'Internal Server error occured. Please try again later.'
        })
      );
    }
  }
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}

import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators } from '../decorators';
import { IPermission } from '../app/models/interfaces';
import { PlatformError } from '../utils/error';
import PermissionBusiness = require('../app/business/PermissionBusiness');

@controller('/v1/permissions')
export class PermissionController {
  @post('/')
  @requestValidators('name', 'type')
  async create(req: Request, res: Response, next: NextFunction) {
    const item: IPermission = req.body;
    try {
      const item: IPermission = req.body;
      const permissionBusiness = new PermissionBusiness();
      const result = await permissionBusiness.create(item);
      if (result.error) {
        return next(
          PlatformError.error({
            code: result.responseCode,
            message: `Error occured. ${result.error}`
          })
        );
      }
      return res.status(201).json({
        message: 'Operation successful',
        data: result.data
      });
    } catch (err) {
      //new InternalServerError('Internal Server error occured', 500);
    }
  }
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}

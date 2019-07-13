import { PlatformError } from '../utils/error/ApplicationError';
import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators } from '../decorators';
import IBaseControler from './interfaces/base/BaseController';
import { IResourcePermission } from '../app/models/interfaces';
import ResourcePermissionBusiness = require('../app/business/ResourcePermissionBusiness');

@controller('/resource-permissions')
export class ResourcePermissionController {
  @post('/')
  @requestValidators('resource', 'role', 'permissions')
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item: IResourcePermission = req.body;
      const resourcePermissionBusiness = new ResourcePermissionBusiness();
      const result = await resourcePermissionBusiness.create(item);
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
      return next(
        PlatformError.error({
          code: 500,
          message: `Internal Server error occured.${err}`
        })
      );
    }
  }
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}

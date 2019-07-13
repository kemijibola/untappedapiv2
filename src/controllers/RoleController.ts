import { PlatformError } from '../utils/error/ApplicationError';
import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators } from '../decorators';
import { IRole } from '../app/models/interfaces';
import RoleBusiness = require('../app/business/RoleBusiness');

@controller('/roles')
export class RoleController {
  @post('/')
  @requestValidators('name', 'global')
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item: IRole = req.body;
      const roleBusiness = new RoleBusiness();
      const result = await roleBusiness.create(item);
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

import { PlatformError } from '../utils/error/ApplicationError';
import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators } from '../decorators';
import IBaseControler from './interfaces/base/BaseController';
import { IResource } from '../app/models/interfaces';
import ResourceBusiness = require('../app/business/ResourceBusiness');

@controller('/resources')
export class ResourceController {
  @post('/')
  @requestValidators('name')
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item: IResource = req.body;
      const resourceBusiness = new ResourceBusiness();
      const result = await resourceBusiness.create(item);
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

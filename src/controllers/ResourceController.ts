import { PlatformError } from '../utils/error/ApplicationError';
import { Request, Response, NextFunction } from 'express';
import {
  controller,
  post,
  requestValidators,
  get,
  use,
  authorize
} from '../decorators';
import IBaseControler from './interfaces/base/BaseController';
import { IResource } from '../app/models/interfaces';
import ResourceBusiness = require('../app/business/ResourceBusiness');
import { requireAuth } from '../middlewares/auth';
import { RequestWithUser } from '../app/models/interfaces/custom/RequestHandler';

export const roles = ['canViewProfessionals', 'canViewTalents'];
@controller('/v1/resources')
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
  @get('/')
  @use(requireAuth)
  @authorize(...roles)
  async fetch(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const resourceBusiness = new ResourceBusiness();
      const result = await resourceBusiness.fetch({});
      if (result.error) {
        return next(
          PlatformError.error({
            code: result.responseCode,
            message: `Error occured. ${result.error}`
          })
        );
      }
      return res.status(200).json({
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
  findById(): void {}
}

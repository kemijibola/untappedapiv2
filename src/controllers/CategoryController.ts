import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators } from '../decorators';
import IBaseController from './interfaces/base/BaseController';
import { ICategory } from '../app/models/interfaces';
import CategoryBusiness from '../app/business/CategoryBusiness';
import { Result } from '../utils/Result';
import { PlatformError } from '../utils/error';

@controller('/v1/categories')
export class CategoryController {
  @post('/')
  @requestValidators('name')
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item: ICategory = req.body;
      const categoryBusiness = new CategoryBusiness();
      const result = await categoryBusiness.create(item);
      if (result.error) {
        return next(
          new PlatformError({
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
        new PlatformError({
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

import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators } from '../decorators';
import IBaseController from './interfaces/base/BaseController';
import { ICategory } from '../app/models/interfaces';
import { RecordExists, InternalServerError } from '../utils/error';
import CategoryBusiness from '../app/business/CategoryBusiness';

@controller('/categories')
export class CategoryController {
  @post('/')
  @requestValidators('name')
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item: ICategory = req.body;
      const categoryBusiness = new CategoryBusiness();
      const newCategory = await categoryBusiness.create(item);
      if (!newCategory.successful) {
        return next(
          new RecordExists(`Error occured.Reason ${newCategory.error}`, 404)
        );
      }
      return res.status(201).json({
        message: 'Operation successful',
        data: newCategory.value
      });
    } catch (err) {
      return next(
        new InternalServerError('Internal Server error occured', 500)
      );
    }
  }
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}

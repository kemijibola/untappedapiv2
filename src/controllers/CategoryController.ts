import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators } from '../decorators';
import IBaseController from './interfaces/base/BaseController';
import CategoryRepository = require('../app/repository/CategoryRepository');
import { ICategory } from '../app/models/interfaces';
import { RecordExists, InternalServerError } from '../utils/error';
import CategoryBusiness from '../app/business/CategoryBusiness';

@controller('/categories')
export class CategoryController implements IBaseController {
  @post('/')
  @requestValidators('name')
  async create(req: Request, res: Response, next: NextFunction) {
    const item: ICategory = req.body;
    try {
      const categoryBusiness = new CategoryBusiness();
      let categoryModel = await categoryBusiness.findByCriteria({
        name: item.name.toLowerCase()
      });
      res.status(200).json(categoryModel);
    } catch (err) {
      new InternalServerError('Internal Server error occured', 500);
    }
  }
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}

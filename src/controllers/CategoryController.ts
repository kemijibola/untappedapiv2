import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators } from '../decorators';
import IBaseController from './interfaces/base/BaseController';
import CategoryRepository = require('../app/repository/CategoryRepository');
import { ICategory } from '../app/models/interfaces';
import { RecordExists, InternalServerError } from '../utils/error';

@controller('/categories')
class CategoryController implements IBaseController {
  @post('/')
  @requestValidators('name')
  async create(req: Request, res: Response, next: NextFunction) {
    const item: ICategory = req.body;
    try {
      let categoryModel = await new CategoryRepository().findByCriteria({
        name: item.name.toLowerCase()
      });
      if (categoryModel)
        return next(
          new RecordExists(
            `Category with name ${categoryModel.name} exists.`,
            400
          )
        );
      const category = await new CategoryRepository().create(item);
      return res.status(201).json({
        message: 'Operation successful',
        data: category
      });
    } catch (err) {
      new InternalServerError('Internal Server error occured', 500);
    }
  }
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}

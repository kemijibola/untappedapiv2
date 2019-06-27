import CategoryRepository from '../repository/CategoryRepository';
import ICategoryBusiness from './interface/CategoryBusiness';
import { ICategory } from '../models/interfaces';

class CategoryBusiness implements ICategoryBusiness {
  private _categoryRepository: CategoryRepository;

  constructor() {
    this._categoryRepository = new CategoryRepository();
  }

  create(item: ICategory, callback: (error: any, result: any) => void) {
    this._categoryRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._categoryRepository.fetch(callback);
  }

  update(
    _id: string,
    item: ICategory,
    callback: (error: any, result: any) => void
  ) {
    this._categoryRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._categoryRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._categoryRepository.delete(_id, callback);
  }

  findById(_id: string, callback: (error: any, result: ICategory) => void) {
    this._categoryRepository.findById(_id, callback);
  }
}
Object.seal(CategoryBusiness);
export = CategoryBusiness;

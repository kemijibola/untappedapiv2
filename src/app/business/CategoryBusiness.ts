import CategoryRepository from '../repository/CategoryRepository';
import ICategoryBusiness = require('./interfaces/CategoryBusiness');
import { ICategory } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';

class CategoryBusiness implements ICategoryBusiness {
  private _categoryRepository: CategoryRepository;

  constructor() {
    this._categoryRepository = new CategoryRepository();
  }

  fetch(): Promise<ICategory> {
    return this._categoryRepository.fetch();
  }

  findById(id: string): Promise<ICategory> {
    return this._categoryRepository.findById(id);
  }

  findByCriteria(criteria: any): Promise<ICategory> {
    console.log(criteria);
    return this._categoryRepository.findByCriteria(criteria);
  }

  create(item: ICategory): Promise<ICategory> {
    return this._categoryRepository.create(item);
  }

  async update(id: string, item: ICategory): Promise<ICategory> {
    const categoryModel = await this._categoryRepository.findById(id);
    if (!categoryModel)
      throw new RecordNotFound(`Category with id: ${id} not found`, 404);
    return this._categoryRepository.update(categoryModel._id, item);
  }

  delete(id: string): Promise<boolean> {
    return this._categoryRepository.delete(id);
  }
}

Object.seal(CategoryBusiness);
export = CategoryBusiness;

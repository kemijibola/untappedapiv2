import CategoryRepository from '../repository/CategoryRepository';
import ICategoryBusiness = require('./interfaces/CategoryBusiness');
import { ICategory } from '../models/interfaces';
import { Result } from '../../utils/Result';

class CategoryBusiness implements ICategoryBusiness {
  private _categoryRepository: CategoryRepository;

  constructor() {
    this._categoryRepository = new CategoryRepository();
  }

  async fetch(): Promise<Result<ICategory>> {
    try {
      const categories = await this._categoryRepository.fetch();
      return Result.ok<ICategory>(200, categories);
    } catch (err) {
      return Result.fail<ICategory>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findById(id: string): Promise<Result<ICategory>> {
    try {
      const category = await this._categoryRepository.findById(id);
      if (!category._id)
        return Result.fail<ICategory>(404, `Category of Id ${id} not found`);
      else return Result.ok<ICategory>(200, category);
    } catch (err) {
      return Result.fail<ICategory>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findByCriteria(criteria: any): Promise<Result<ICategory>> {
    try {
      const category = await this._categoryRepository.findByCriteria(criteria);
      if (!category._id)
        return Result.fail<ICategory>(404, `Approval not found`);
      else return Result.ok<ICategory>(200, category);
    } catch (err) {
      return Result.fail<ICategory>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async create(item: ICategory): Promise<Result<ICategory>> {
    try {
      const category = await this._categoryRepository.findByCriteria({
        name: item.name
      });
      if (category === null) {
        const newCategory = await this._categoryRepository.create(item);
        return Result.ok<ICategory>(201, newCategory);
      }
      return Result.fail<ICategory>(
        400,
        `Category with name ${category.name} exists.`
      );
    } catch (err) {
      return Result.fail<ICategory>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async update(id: string, item: ICategory): Promise<Result<ICategory>> {
    try {
      const category = await this._categoryRepository.findById(id);
      if (!category._id)
        return Result.fail<ICategory>(
          404,
          `Could not update approval.Approval of Id ${id} not found`
        );
      const updateObj = await this._categoryRepository.update(
        category._id,
        item
      );
      return Result.ok<ICategory>(200, updateObj);
    } catch (err) {
      return Result.fail<ICategory>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._categoryRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      return Result.fail<boolean>(500, `Internal server error occured. ${err}`);
    }
  }
}

Object.seal(CategoryBusiness);
export = CategoryBusiness;

import CategoryRepository from '../repository/CategoryRepository';
import ICategoryBusiness = require('./interfaces/CategoryBusiness');
import { ICategory } from '../models/interfaces';
import { Result } from '../../utils/Result';

class CategoryBusiness implements ICategoryBusiness {
  private _categoryRepository: CategoryRepository;

  constructor() {
    this._categoryRepository = new CategoryRepository();
  }

  async fetch(condition: any): Promise<Result<ICategory[]>> {
    try {
      const categories = await this._categoryRepository.fetch(condition);
      return Result.ok<ICategory[]>(200, categories);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<ICategory>> {
    try {
      const category = await this._categoryRepository.findById(id);
      if (!category)
        return Result.fail<ICategory>(404, `Category of Id ${id} not found`);
      else return Result.ok<ICategory>(200, category);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<ICategory>> {
    try {
      const category = await this._categoryRepository.findByCriteria(criteria);
      if (!category) return Result.fail<ICategory>(404, `Approval not found`);
      else return Result.ok<ICategory>(200, category);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
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
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(id: string, item: ICategory): Promise<Result<ICategory>> {
    try {
      const category = await this._categoryRepository.findById(id);
      if (!category)
        return Result.fail<ICategory>(
          404,
          `Could not update category.Category with Id ${id} not found`
        );
      const updateObj = await this._categoryRepository.update(
        category._id,
        item
      );
      return Result.ok<ICategory>(200, updateObj);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._categoryRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(CategoryBusiness);
export = CategoryBusiness;

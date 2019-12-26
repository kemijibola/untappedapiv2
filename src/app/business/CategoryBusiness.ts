import CategoryRepository from "../repository/CategoryRepository";
import ICategoryBusiness = require("./interfaces/CategoryBusiness");
import { ICategory } from "../models/interfaces";
import { Result } from "../../utils/Result";

class CategoryBusiness implements ICategoryBusiness {
  private _categoryRepository: CategoryRepository;

  constructor() {
    this._categoryRepository = new CategoryRepository();
  }

  async fetch(condition: any): Promise<Result<ICategory[]>> {
    const categories = await this._categoryRepository.fetch(condition);
    return Result.ok<ICategory[]>(200, categories);
  }

  async findById(id: string): Promise<Result<ICategory>> {
    if (!id) return Result.fail<ICategory>(400, "Bad request.");
    const category = await this._categoryRepository.findById(id);
    if (!category)
      return Result.fail<ICategory>(404, `Category of Id ${id} not found`);
    return Result.ok<ICategory>(200, category);
  }

  async findOne(condition: any): Promise<Result<ICategory>> {
    if (!condition) return Result.fail<ICategory>(400, "Bad request.");
    const category = await this._categoryRepository.findByOne(condition);
    if (!category) return Result.fail<ICategory>(404, `Category not found`);
    return Result.ok<ICategory>(200, category);
  }

  async findByCriteria(criteria: any): Promise<Result<ICategory>> {
    const category = await this._categoryRepository.findByCriteria(criteria);
    if (!category)
      return Result.fail<ICategory>(404, `Category type not found`);
    return Result.ok<ICategory>(200, category);
  }

  async create(item: ICategory): Promise<Result<ICategory>> {
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
  }

  async update(id: string, item: ICategory): Promise<Result<ICategory>> {
    const category = await this._categoryRepository.findById(id);
    if (!category)
      return Result.fail<ICategory>(
        404,
        `Could not update category.Category with Id ${id} not found`
      );
    const updateObj = await this._categoryRepository.update(category._id, item);
    return Result.ok<ICategory>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._categoryRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(CategoryBusiness);
export = CategoryBusiness;

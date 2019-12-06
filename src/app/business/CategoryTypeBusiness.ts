import CategoryTypeRepository from "../repository/CategoryTypeRepository";
import CategoryRepository from "../repository/CategoryRepository";
import ICategoryTypeBusiness = require("./interfaces/CategoryTypeBusiness");
import { ICategoryType } from "../models/interfaces";
import { Result } from "../../utils/Result";

class CategoryTypeBusiness implements ICategoryTypeBusiness {
  private _categoryTypeRepository: CategoryTypeRepository;
  private _categoryRepository: CategoryRepository;

  constructor() {
    this._categoryTypeRepository = new CategoryTypeRepository();
    this._categoryRepository = new CategoryRepository();
  }

  async fetch(condition: any): Promise<Result<ICategoryType[]>> {
    try {
      const categoryTypes = await this._categoryTypeRepository.populateFetch(
        "category",
        condition
      );
      return Result.ok<ICategoryType[]>(200, categoryTypes);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<ICategoryType>> {
    try {
      if (!id) return Result.fail<ICategoryType>(400, "Bad request.");
      const categoryType = await this._categoryTypeRepository.findById(id);
      if (!categoryType)
        return Result.fail<ICategoryType>(
          404,
          `Category type of Id ${id} not found`
        );
      else return Result.ok<ICategoryType>(200, categoryType);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findOne(condition: any): Promise<Result<ICategoryType>> {
    try {
      if (!condition) return Result.fail<ICategoryType>(400, "Bad request.");
      const categoryType = await this._categoryTypeRepository.findByOne(
        condition
      );
      if (!categoryType)
        return Result.fail<ICategoryType>(404, `Category type not found`);
      else return Result.ok<ICategoryType>(200, categoryType);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<ICategoryType>> {
    try {
      const categoryType = await this._categoryTypeRepository.findByCriteria(
        criteria
      );
      if (!categoryType)
        return Result.fail<ICategoryType>(404, `Category type not found`);
      else return Result.ok<ICategoryType>(200, categoryType);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: ICategoryType): Promise<Result<ICategoryType>> {
    try {
      const category = await this._categoryRepository.findById(item.category);
      if (category == null) {
        return Result.fail<ICategoryType>(
          400,
          `Invalid category id: ${item.category}`
        );
      }
      const categoryType = await this._categoryTypeRepository.findByCriteria({
        name: item.name
      });
      if (categoryType === null) {
        const newCategoryType = await this._categoryTypeRepository.create(item);
        return Result.ok<ICategoryType>(201, newCategoryType);
      }
      return Result.fail<ICategoryType>(
        400,
        `Category with name ${categoryType.name} exists.`
      );
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(
    id: string,
    item: ICategoryType
  ): Promise<Result<ICategoryType>> {
    try {
      const categoryType = await this._categoryTypeRepository.findById(id);
      if (!categoryType)
        return Result.fail<ICategoryType>(
          404,
          `Could not update category type.Category type with Id ${id} not found`
        );
      const updateObj = await this._categoryTypeRepository.update(
        categoryType._id,
        item
      );
      return Result.ok<ICategoryType>(200, updateObj);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._categoryTypeRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(CategoryTypeBusiness);
export = CategoryTypeBusiness;

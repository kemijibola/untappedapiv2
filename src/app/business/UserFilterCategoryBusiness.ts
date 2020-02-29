import UserFilterCategoryRepository from "../repository/UserFilterCategoryRepository";
import IUserFilterCategoryBusiness = require("./interfaces/UserFilterCategoryBusiness");
import { IUserFilterCategory } from "../models/interfaces";
import { Result } from "../../utils/Result";

class UserFilterCategoryBusiness implements IUserFilterCategoryBusiness {
  private _userFilterCategoryRepository: UserFilterCategoryRepository;

  constructor() {
    this._userFilterCategoryRepository = new UserFilterCategoryRepository();
  }

  async fetch(condition: any): Promise<Result<IUserFilterCategory[]>> {
    const userFilterCategories = await this._userFilterCategoryRepository.fetch(
      condition
    );
    return Result.ok<IUserFilterCategory[]>(200, userFilterCategories);
  }

  async findById(id: string): Promise<Result<IUserFilterCategory>> {
    if (!id) return Result.fail<IUserFilterCategory>(400, "Bad request");
    const userFilterCategory = await this._userFilterCategoryRepository.findById(
      id
    );
    if (!userFilterCategory)
      return Result.fail<IUserFilterCategory>(
        404,
        `User filter category of Id ${id} not found`
      );
    return Result.ok<IUserFilterCategory>(200, userFilterCategory);
  }

  async findOne(condition: any): Promise<Result<IUserFilterCategory>> {
    if (!condition) return Result.fail<IUserFilterCategory>(400, "Bad request");
    const userFilterCategory = await this._userFilterCategoryRepository.findByOne(
      condition
    );
    if (!userFilterCategory)
      return Result.fail<IUserFilterCategory>(
        404,
        "User filter category not found"
      );
    return Result.ok<IUserFilterCategory>(200, userFilterCategory);
  }

  async findByCriteria(criteria: any): Promise<Result<IUserFilterCategory>> {
    const userFilterCategory = await this._userFilterCategoryRepository.findByCriteria(
      criteria
    );
    if (!userFilterCategory)
      return Result.fail<IUserFilterCategory>(
        404,
        "User filter category not found"
      );
    return Result.ok<IUserFilterCategory>(200, userFilterCategory);
  }

  async create(
    item: IUserFilterCategory
  ): Promise<Result<IUserFilterCategory>> {
    const newUserFilterCategory = await this._userFilterCategoryRepository.create(
      item
    );
    return Result.ok<IUserFilterCategory>(201, newUserFilterCategory);
  }

  async update(
    id: string,
    item: IUserFilterCategory
  ): Promise<Result<IUserFilterCategory>> {
    const userFilterCategory = await this._userFilterCategoryRepository.findById(
      id
    );
    if (!userFilterCategory)
      return Result.fail<IUserFilterCategory>(
        404,
        `Could not update user filter category.User filter category with Id ${id} not found`
      );
    const updateObj = await this._userFilterCategoryRepository.update(
      userFilterCategory._id,
      item
    );
    return Result.ok<IUserFilterCategory>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._userFilterCategoryRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(UserFilterCategoryBusiness);
export = UserFilterCategoryBusiness;

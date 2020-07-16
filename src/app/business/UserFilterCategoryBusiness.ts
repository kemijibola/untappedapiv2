import UserFilterCategoryRepository from "../repository/UserFilterCategoryRepository";
import IUserFilterCategoryBusiness = require("./interfaces/UserFilterCategoryBusiness");
import { IUserFilterCategory } from "../models/interfaces";
import { Result } from "../../utils/Result";
import { ObjectKeyString } from "../../utils/lib";

class UserFilterCategoryBusiness implements IUserFilterCategoryBusiness {
  private _userFilterCategoryRepository: UserFilterCategoryRepository;

  constructor() {
    this._userFilterCategoryRepository = new UserFilterCategoryRepository();
  }

  async fetch(condition: any): Promise<Result<IUserFilterCategory[]>> {
    let query: any = {};
    if (condition.searchText) {
      query = {
        $text: { $search: condition.searchText },
      };
    }

    if (condition.userTypeId) {
      query.userType = condition.userTypeId;
    }

    if (condition.reportType) {
      query.reportType = condition.reportType;
    }

    let userFilterCategories: IUserFilterCategory[] = await this._userFilterCategoryRepository.fetch(
      query
    );

    console.log("line 30", query);
    console.log("line 31", userFilterCategories);
    if (condition.categoryId) {
      console.log("categoryId found");
      userFilterCategories = userFilterCategories.reduce(
        (theMap: IUserFilterCategory[], theItem: IUserFilterCategory) => {
          var found = theItem.categoryTypes.filter(
            (x) => x.category.toString() === condition.categoryId
          )[0];
          console.log("category found", found);
          if (found) {
            theMap = [...theMap, theItem];
          }
          return theMap;
        },
        []
      );
    }
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

  async createMany(items: IUserFilterCategory[]): Promise<Result<any>> {
    const newUserFilters = await this._userFilterCategoryRepository.insertMany(
      items
    );
    return Result.ok<IUserFilterCategory>(201, newUserFilters);
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

  async deleteMany(criteria: any): Promise<Result<any>> {
    const deleted = await this._userFilterCategoryRepository.deleteMany(
      criteria
    );
    return Result.ok<boolean>(200, deleted);
  }
}

Object.seal(UserFilterCategoryBusiness);
export = UserFilterCategoryBusiness;

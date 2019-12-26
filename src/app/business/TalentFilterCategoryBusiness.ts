import TalentFilterCategoryRepository from "../repository/TalentFilterCategoryRepository";
import ITalentFilterCategoryBusiness = require("./interfaces/TalentFilterCategoryBusiness");
import { ITalentFilterCategory } from "../models/interfaces";
import { Result } from "../../utils/Result";

class TalentFilterCategoryBusiness implements ITalentFilterCategoryBusiness {
  private _talentFilterCategoryRepository: TalentFilterCategoryRepository;

  constructor() {
    this._talentFilterCategoryRepository = new TalentFilterCategoryRepository();
  }

  async fetch(condition: any): Promise<Result<ITalentFilterCategory[]>> {
    const talentFilterCategories = await this._talentFilterCategoryRepository.fetch(
      condition
    );
    return Result.ok<ITalentFilterCategory[]>(200, talentFilterCategories);
  }

  async findById(id: string): Promise<Result<ITalentFilterCategory>> {
    if (!id) return Result.fail<ITalentFilterCategory>(400, "Bad request");
    const talentFilterCategory = await this._talentFilterCategoryRepository.findById(
      id
    );
    if (!talentFilterCategory)
      return Result.fail<ITalentFilterCategory>(
        404,
        `Talent filter category of Id ${id} not found`
      );
    return Result.ok<ITalentFilterCategory>(200, talentFilterCategory);
  }

  async findOne(condition: any): Promise<Result<ITalentFilterCategory>> {
    if (!condition)
      return Result.fail<ITalentFilterCategory>(400, "Bad request");
    const talentFilterCategory = await this._talentFilterCategoryRepository.findByOne(
      condition
    );
    if (!talentFilterCategory)
      return Result.fail<ITalentFilterCategory>(
        404,
        `Talent filter category not found`
      );
    return Result.ok<ITalentFilterCategory>(200, talentFilterCategory);
  }

  async findByCriteria(criteria: any): Promise<Result<ITalentFilterCategory>> {
    const talentFilterCategory = await this._talentFilterCategoryRepository.findByCriteria(
      criteria
    );
    if (!talentFilterCategory)
      return Result.fail<ITalentFilterCategory>(
        404,
        `Talent filter category not found`
      );
    return Result.ok<ITalentFilterCategory>(200, talentFilterCategory);
  }

  async create(
    item: ITalentFilterCategory
  ): Promise<Result<ITalentFilterCategory>> {
    const newTalentFilterCategory = await this._talentFilterCategoryRepository.create(
      item
    );
    return Result.ok<ITalentFilterCategory>(201, newTalentFilterCategory);
  }

  async update(
    id: string,
    item: ITalentFilterCategory
  ): Promise<Result<ITalentFilterCategory>> {
    const talentFilterCategory = await this._talentFilterCategoryRepository.findById(
      id
    );
    if (!talentFilterCategory)
      return Result.fail<ITalentFilterCategory>(
        404,
        `Could not update talent filter category.Talent filter category with Id ${id} not found`
      );
    const updateObj = await this._talentFilterCategoryRepository.update(
      talentFilterCategory._id,
      item
    );
    return Result.ok<ITalentFilterCategory>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._talentFilterCategoryRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(TalentFilterCategoryBusiness);
export = TalentFilterCategoryBusiness;

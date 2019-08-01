import TalentFilterCategoryRepository from '../repository/TalentFilterCategoryRepository';
import ITalentFilterCategoryBusiness = require('./interfaces/TalentFilterCategoryBusiness');
import { ITalentFilterCategory } from '../models/interfaces';
import { Result } from '../../utils/Result';

class TalentFilterCategoryBusiness implements ITalentFilterCategoryBusiness {
  private _talentFilterCategoryRepository: TalentFilterCategoryRepository;

  constructor() {
    this._talentFilterCategoryRepository = new TalentFilterCategoryRepository();
  }

  async fetch(condition: any): Promise<Result<ITalentFilterCategory[]>> {
    try {
      const talentFilterCategories = await this._talentFilterCategoryRepository.fetch(
        condition
      );
      return Result.ok<ITalentFilterCategory[]>(200, talentFilterCategories);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<ITalentFilterCategory>> {
    try {
      const talentFilterCategory = await this._talentFilterCategoryRepository.findById(
        id
      );
      if (!talentFilterCategory)
        return Result.fail<ITalentFilterCategory>(
          404,
          `Talent filter category of Id ${id} not found`
        );
      else return Result.ok<ITalentFilterCategory>(200, talentFilterCategory);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<ITalentFilterCategory>> {
    try {
      const talentFilterCategory = await this._talentFilterCategoryRepository.findByCriteria(
        criteria
      );
      if (!talentFilterCategory)
        return Result.fail<ITalentFilterCategory>(
          404,
          `Talent filter category not found`
        );
      else return Result.ok<ITalentFilterCategory>(200, talentFilterCategory);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(
    item: ITalentFilterCategory
  ): Promise<Result<ITalentFilterCategory>> {
    try {
      const newTalentFilterCategory = await this._talentFilterCategoryRepository.create(
        item
      );
      return Result.ok<ITalentFilterCategory>(201, newTalentFilterCategory);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(
    id: string,
    item: ITalentFilterCategory
  ): Promise<Result<ITalentFilterCategory>> {
    try {
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
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._talentFilterCategoryRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(TalentFilterCategoryBusiness);
export = TalentFilterCategoryBusiness;

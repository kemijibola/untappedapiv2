import IssueCategoryRepository from '../repository/IssueCategoryRepository';
import IIssueCategoryBusiness = require('./interfaces/IssueCategoryBusiness');
import { IIssueCategory } from '../models/interfaces';
import { Result } from '../../utils/Result';

class IssueCategoryBusiness implements IIssueCategoryBusiness {
  private _issueCategoryRepository: IssueCategoryRepository;

  constructor() {
    this._issueCategoryRepository = new IssueCategoryRepository();
  }

  async fetch(condition: any): Promise<Result<IIssueCategory[]>> {
    try {
      const issueCategories = await this._issueCategoryRepository.fetch(
        condition
      );
      return Result.ok<IIssueCategory[]>(200, issueCategories);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IIssueCategory>> {
    try {
      const issueCategory = await this._issueCategoryRepository.findById(id);
      if (!issueCategory)
        return Result.fail<IIssueCategory>(
          404,
          `Issue category of Id ${id} not found`
        );
      else return Result.ok<IIssueCategory>(200, issueCategory);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IIssueCategory>> {
    try {
      const issueCategory = await this._issueCategoryRepository.findByCriteria(
        criteria
      );
      if (!issueCategory)
        return Result.fail<IIssueCategory>(404, `Issue category not found`);
      else return Result.ok<IIssueCategory>(200, issueCategory);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: IIssueCategory): Promise<Result<IIssueCategory>> {
    try {
      const newIssueCategory = await this._issueCategoryRepository.create(item);
      return Result.ok<IIssueCategory>(201, newIssueCategory);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(
    id: string,
    item: IIssueCategory
  ): Promise<Result<IIssueCategory>> {
    try {
      const gig = await this._issueCategoryRepository.findById(id);
      if (!gig)
        return Result.fail<IIssueCategory>(
          404,
          `Could not update issue category.Issue category with Id ${id} not found`
        );
      const updateObj = await this._issueCategoryRepository.update(
        gig._id,
        item
      );
      return Result.ok<IIssueCategory>(200, updateObj);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._issueCategoryRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(IssueCategoryBusiness);
export = IssueCategoryBusiness;

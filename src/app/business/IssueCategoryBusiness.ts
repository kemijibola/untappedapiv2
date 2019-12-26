import IssueCategoryRepository from "../repository/IssueCategoryRepository";
import IIssueCategoryBusiness = require("./interfaces/IssueCategoryBusiness");
import { IIssueCategory } from "../models/interfaces";
import { Result } from "../../utils/Result";

class IssueCategoryBusiness implements IIssueCategoryBusiness {
  private _issueCategoryRepository: IssueCategoryRepository;

  constructor() {
    this._issueCategoryRepository = new IssueCategoryRepository();
  }

  async fetch(condition: any): Promise<Result<IIssueCategory[]>> {
    const issueCategories = await this._issueCategoryRepository.fetch(
      condition
    );
    return Result.ok<IIssueCategory[]>(200, issueCategories);
  }

  async findById(id: string): Promise<Result<IIssueCategory>> {
    if (!id) return Result.fail<IIssueCategory>(400, "Bad request.");
    const issueCategory = await this._issueCategoryRepository.findById(id);
    if (!issueCategory)
      return Result.fail<IIssueCategory>(
        404,
        `Issue category of Id ${id} not found`
      );
    return Result.ok<IIssueCategory>(200, issueCategory);
  }

  async findOne(condition: any): Promise<Result<IIssueCategory>> {
    if (!condition) return Result.fail<IIssueCategory>(400, "Bad request.");
    const issueCategory = await this._issueCategoryRepository.findByOne(
      condition
    );
    if (!issueCategory)
      return Result.fail<IIssueCategory>(404, `Issue category not found`);
    return Result.ok<IIssueCategory>(200, issueCategory);
  }

  async findByCriteria(criteria: any): Promise<Result<IIssueCategory>> {
    const issueCategory = await this._issueCategoryRepository.findByCriteria(
      criteria
    );
    if (!issueCategory)
      return Result.fail<IIssueCategory>(404, `Issue category not found`);
    return Result.ok<IIssueCategory>(200, issueCategory);
  }

  async create(item: IIssueCategory): Promise<Result<IIssueCategory>> {
    const newIssueCategory = await this._issueCategoryRepository.create(item);
    return Result.ok<IIssueCategory>(201, newIssueCategory);
  }

  async update(
    id: string,
    item: IIssueCategory
  ): Promise<Result<IIssueCategory>> {
    const gig = await this._issueCategoryRepository.findById(id);
    if (!gig)
      return Result.fail<IIssueCategory>(
        404,
        `Could not update issue category.Issue category with Id ${id} not found`
      );
    const updateObj = await this._issueCategoryRepository.update(gig._id, item);
    return Result.ok<IIssueCategory>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._issueCategoryRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(IssueCategoryBusiness);
export = IssueCategoryBusiness;

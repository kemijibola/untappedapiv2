import ContestConfigRepository from "../repository/ContestConfigRepository";
import IContestConfigBusiness = require("./interfaces/ContestConfigBusiness");
import { IContestConfig } from "../models/interfaces";
import { Result } from "../../utils/Result";

class ContestConfigBusiness implements IContestConfigBusiness {
  private _contestConfigRepository: ContestConfigRepository;

  constructor() {
    this._contestConfigRepository = new ContestConfigRepository();
  }

  async fetch(condition: any): Promise<Result<IContestConfig[]>> {
    const contestConfigs = await this._contestConfigRepository.fetch(condition);
    return Result.ok<IContestConfig[]>(200, contestConfigs);
  }

  async findById(id: string): Promise<Result<IContestConfig>> {
    if (!id) return Result.fail<IContestConfig>(400, "Bad request.");
    const contestConfig = await this._contestConfigRepository.findById(id);
    if (!contestConfig)
      return Result.fail<IContestConfig>(
        404,
        `Contest config of Id ${id} not found`
      );
    return Result.ok<IContestConfig>(200, contestConfig);
  }

  async findOne(condition: any): Promise<Result<IContestConfig>> {
    if (!condition) return Result.fail<IContestConfig>(400, "Bad request.");
    const contestConfig = await this._contestConfigRepository.findByOne(
      condition
    );
    if (!contestConfig)
      return Result.fail<IContestConfig>(404, `Contest config not found`);
    return Result.ok<IContestConfig>(200, contestConfig);
  }

  async findByCriteria(criteria: any): Promise<Result<IContestConfig>> {
    const contestConfig = await this._contestConfigRepository.findByCriteria(
      criteria
    );
    if (!contestConfig)
      return Result.fail<IContestConfig>(404, `Contest config not found`);
    return Result.ok<IContestConfig>(200, contestConfig);
  }

  async create(item: IContestConfig): Promise<Result<IContestConfig>> {
    const newContestConfig = await this._contestConfigRepository.create(item);
    // TODO:: Create approval request
    return Result.ok<IContestConfig>(201, newContestConfig);
  }

  async update(
    id: string,
    item: IContestConfig
  ): Promise<Result<IContestConfig>> {
    const contestConfig = await this._contestConfigRepository.findById(id);
    if (!contestConfig)
      return Result.fail<IContestConfig>(
        404,
        `Could not update contest Config.Contest config with Id ${id} not found`
      );
    const updateObj = await this._contestConfigRepository.update(
      contestConfig._id,
      item
    );
    return Result.ok<IContestConfig>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._contestConfigRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(ContestConfigBusiness);
export = ContestConfigBusiness;

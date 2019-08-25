import ContestConfigRepository from '../repository/ContestConfigRepository';
import IContestConfigBusiness = require('./interfaces/ContestConfigBusiness');
import { IContestConfig } from '../models/interfaces';
import { Result } from '../../utils/Result';

class ContestConfigBusiness implements IContestConfigBusiness {
  private _contestConfigRepository: ContestConfigRepository;

  constructor() {
    this._contestConfigRepository = new ContestConfigRepository();
  }

  async fetch(condition: any): Promise<Result<IContestConfig[]>> {
    try {
      const contestConfigs = await this._contestConfigRepository.fetch(
        condition
      );
      return Result.ok<IContestConfig[]>(200, contestConfigs);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IContestConfig>> {
    try {
      if (!id) return Result.fail<IContestConfig>(400, 'Bad request.');
      const contestConfig = await this._contestConfigRepository.findById(id);
      if (!contestConfig)
        return Result.fail<IContestConfig>(
          404,
          `Contest config of Id ${id} not found`
        );
      else return Result.ok<IContestConfig>(200, contestConfig);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findOne(condition: any): Promise<Result<IContestConfig>> {
    try {
      if (!condition) return Result.fail<IContestConfig>(400, 'Bad request.');
      const contestConfig = await this._contestConfigRepository.findByOne(
        condition
      );
      if (!contestConfig)
        return Result.fail<IContestConfig>(404, `Contest config not found`);
      else return Result.ok<IContestConfig>(200, contestConfig);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IContestConfig>> {
    try {
      const contestConfig = await this._contestConfigRepository.findByCriteria(
        criteria
      );
      if (!contestConfig)
        return Result.fail<IContestConfig>(404, `Contest config not found`);
      else return Result.ok<IContestConfig>(200, contestConfig);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: IContestConfig): Promise<Result<IContestConfig>> {
    try {
      const newContestConfig = await this._contestConfigRepository.create(item);
      // TODO:: Create approval request
      return Result.ok<IContestConfig>(201, newContestConfig);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(
    id: string,
    item: IContestConfig
  ): Promise<Result<IContestConfig>> {
    try {
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
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._contestConfigRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(ContestConfigBusiness);
export = ContestConfigBusiness;

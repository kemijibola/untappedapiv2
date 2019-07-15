import ContestEntryRepository from '../repository/ContestEntryRepository';
import IContestEntryBusiness = require('./interfaces/ContestEntryBusiness');
import { IContestEntry } from '../models/interfaces';
import { Result } from '../../utils/Result';

class ContestBusiness implements IContestEntryBusiness {
  private _contestEntryRepository: ContestEntryRepository;

  constructor() {
    this._contestEntryRepository = new ContestEntryRepository();
  }

  async fetch(condition: any): Promise<Result<IContestEntry[]>> {
    try {
      const contestEntries = await this._contestEntryRepository.fetch(
        condition
      );
      return Result.ok<IContestEntry[]>(200, contestEntries);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IContestEntry>> {
    try {
      const contestEntry = await this._contestEntryRepository.findById(id);
      if (!contestEntry)
        return Result.fail<IContestEntry>(
          404,
          `Contest entry of Id ${id} not found`
        );
      else return Result.ok<IContestEntry>(200, contestEntry);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IContestEntry>> {
    try {
      const contestEntry = await this._contestEntryRepository.findByCriteria(
        criteria
      );
      if (!contestEntry)
        return Result.fail<IContestEntry>(404, `Contest entry not found`);
      else return Result.ok<IContestEntry>(200, contestEntry);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: IContestEntry): Promise<Result<IContestEntry>> {
    try {
      const newContestEntry = await this._contestEntryRepository.create(item);
      // TODO:: create approval request here
      return Result.ok<IContestEntry>(201, newContestEntry);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(
    id: string,
    item: IContestEntry
  ): Promise<Result<IContestEntry>> {
    try {
      const contestEntry = await this._contestEntryRepository.findById(id);
      if (!contestEntry)
        return Result.fail<IContestEntry>(
          404,
          `Could not update approval.Approval of Id ${id} not found`
        );
      const updateObj = await this._contestEntryRepository.update(
        contestEntry._id,
        item
      );
      return Result.ok<IContestEntry>(200, updateObj);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._contestEntryRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(ContestBusiness);
export = ContestBusiness;

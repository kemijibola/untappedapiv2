import ContestEntryRepository from '../repository/ContestEntryRepository';
import IContestEntryBusiness = require('./interfaces/ContestEntryBusiness');
import { IContestEntry } from '../models/interfaces';
import { Result } from '../../utils/Result';

class ContestBusiness implements IContestEntryBusiness {
  private _contestEntryRepository: ContestEntryRepository;

  constructor() {
    this._contestEntryRepository = new ContestEntryRepository();
  }

  async fetch(): Promise<Result<IContestEntry>> {
    try {
      const contestEntries = await this._contestEntryRepository.fetch();
      return Result.ok<IContestEntry>(200, contestEntries);
    } catch (err) {
      return Result.fail<IContestEntry>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findById(id: string): Promise<Result<IContestEntry>> {
    try {
      const contestEntry = await this._contestEntryRepository.findById(id);
      if (!contestEntry._id)
        return Result.fail<IContestEntry>(
          404,
          `Contest entry of Id ${id} not found`
        );
      else return Result.ok<IContestEntry>(200, contestEntry);
    } catch (err) {
      return Result.fail<IContestEntry>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IContestEntry>> {
    try {
      const contestEntry = await this._contestEntryRepository.findByCriteria(
        criteria
      );
      if (!contestEntry._id)
        return Result.fail<IContestEntry>(404, `Contest entry not found`);
      else return Result.ok<IContestEntry>(200, contestEntry);
    } catch (err) {
      return Result.fail<IContestEntry>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async create(item: IContestEntry): Promise<Result<IContestEntry>> {
    try {
      const newContestEntry = await this._contestEntryRepository.create(item);
      return Result.ok<IContestEntry>(201, newContestEntry);
    } catch (err) {
      return Result.fail<IContestEntry>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async update(
    id: string,
    item: IContestEntry
  ): Promise<Result<IContestEntry>> {
    try {
      const contestEntry = await this._contestEntryRepository.findById(id);
      if (!contestEntry._id)
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
      return Result.fail<IContestEntry>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._contestEntryRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      return Result.fail<boolean>(500, `Internal server error occured. ${err}`);
    }
  }
}

Object.seal(ContestBusiness);
export = ContestBusiness;

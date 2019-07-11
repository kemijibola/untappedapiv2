import ContestRepository from '../repository/ContestRepository';
import IContestBusiness = require('./interfaces/ContestBusiness');
import { IContest } from '../models/interfaces';
import { Result } from '../../utils/Result';

class ContestBusiness implements IContestBusiness {
  private _contestRepository: ContestRepository;

  constructor() {
    this._contestRepository = new ContestRepository();
  }

  async fetch(): Promise<Result<IContest>> {
    try {
      const contests = await this._contestRepository.fetch();
      return Result.ok<IContest>(200, contests);
    } catch (err) {
      return Result.fail<IContest>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findById(id: string): Promise<Result<IContest>> {
    try {
      const contest = await this._contestRepository.findById(id);
      if (!contest._id)
        return Result.fail<IContest>(404, `Contest of Id ${id} not found`);
      else return Result.ok<IContest>(200, contest);
    } catch (err) {
      return Result.fail<IContest>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IContest>> {
    try {
      const contest = await this._contestRepository.findByCriteria(criteria);
      if (!contest._id) return Result.fail<IContest>(404, `Contest not found`);
      else return Result.ok<IContest>(200, contest);
    } catch (err) {
      return Result.fail<IContest>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async create(item: IContest): Promise<Result<IContest>> {
    try {
      const newContest = await this._contestRepository.create(item);
      return Result.ok<IContest>(201, newContest);
    } catch (err) {
      return Result.fail<IContest>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async update(id: string, item: IContest): Promise<Result<IContest>> {
    try {
      const contest = await this._contestRepository.findById(id);
      if (!contest._id)
        return Result.fail<IContest>(
          404,
          `Could not update approval.Approval of Id ${id} not found`
        );
      const updateObj = await this._contestRepository.update(contest._id, item);
      return Result.ok<IContest>(200, updateObj);
    } catch (err) {
      return Result.fail<IContest>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._contestRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      return Result.fail<boolean>(500, `Internal server error occured. ${err}`);
    }
  }
}

Object.seal(ContestBusiness);
export = ContestBusiness;

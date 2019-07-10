import ContestRepository from '../repository/ContestRepository';
import IContestBusiness = require('./interfaces/ContestBusiness');
import { IContest } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';

class ContestBusiness implements IContestBusiness {
  private _contestRepository: ContestRepository;

  constructor() {
    this._contestRepository = new ContestRepository();
  }

  fetch(): Promise<IContest> {
    return this._contestRepository.fetch();
  }

  findById(id: string): Promise<IContest> {
    return this._contestRepository.findById(id);
  }

  findByCriteria(criteria: any): Promise<IContest> {
    return this.findByCriteria(criteria);
  }

  create(item: IContest): Promise<IContest> {
    return this._contestRepository.create(item);
  }

  async update(id: string, item: IContest): Promise<IContest> {
    const contestModel = await this._contestRepository.findById(id);
    if (!contestModel)
      throw new RecordNotFound(`Contest with id: ${id} not found`, 404);
    return this._contestRepository.update(contestModel._id, item);
  }

  delete(id: string): Promise<boolean> {
    return this._contestRepository.delete(id);
  }
}

Object.seal(ContestBusiness);
export = ContestBusiness;

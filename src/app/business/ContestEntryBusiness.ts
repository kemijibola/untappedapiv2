import ContestEntryRepository from '../repository/ContestEntryRepository';
import IContestEntryBusiness = require('./interfaces/ContestEntryBusiness');
import { IContestEntry } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';

class ContestBusiness implements IContestEntryBusiness {
  private _contestEntryRepository: ContestEntryRepository;

  constructor() {
    this._contestEntryRepository = new ContestEntryRepository();
  }

  fetch(): Promise<IContestEntry> {
    return this._contestEntryRepository.fetch();
  }

  findById(id: string): Promise<IContestEntry> {
    return this._contestEntryRepository.findById(id);
  }

  findByCriteria(criteria: any): Promise<IContestEntry> {
    return this.findByCriteria(criteria);
  }

  create(item: IContestEntry): Promise<IContestEntry> {
    return this._contestEntryRepository.create(item);
  }

  async update(id: string, item: IContestEntry): Promise<IContestEntry> {
    const contestEntryModel = await this._contestEntryRepository.findById(id);
    if (!contestEntryModel)
      throw new RecordNotFound(`Contest with id: ${id} not found`, 404);
    return this._contestEntryRepository.update(contestEntryModel._id, item);
  }

  delete(id: string): Promise<boolean> {
    return this._contestEntryRepository.delete(id);
  }
}

Object.seal(ContestBusiness);
export = ContestBusiness;

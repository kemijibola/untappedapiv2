import ContestEntryRepository from '../repository/ContestEntryEpository';
import IContestEntryBusiness from './interface/ContestEntryBusiness';
import { IContestEntry } from '../models/interfaces';

class ContestEntryBusiness implements IContestEntryBusiness {
  private _contestEntryRepository: ContestEntryRepository;

  constructor() {
    this._contestEntryRepository = new ContestEntryRepository();
  }

  create(item: IContestEntry, callback: (error: any, result: any) => void) {
    this._contestEntryRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._contestEntryRepository.fetch(callback);
  }

  update(
    _id: string,
    item: IContestEntry,
    callback: (error: any, result: any) => void
  ) {
    this._contestEntryRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._contestEntryRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._contestEntryRepository.delete(_id, callback);
  }

  findById(_id: string, callback: (error: any, result: IContestEntry) => void) {
    this._contestEntryRepository.findById(_id, callback);
  }
}
Object.seal(ContestEntryBusiness);
export = ContestEntryBusiness;

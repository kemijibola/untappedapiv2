import ContestRepository from '../repository/ContestRepository';
import IContestBusiness from './interface/ContestBusiness';
import { IContest } from '../models/interfaces';

class ContestBusiness implements IContestBusiness {
  private _contestRepository: ContestRepository;

  constructor() {
    this._contestRepository = new ContestRepository();
  }

  create(item: IContest, callback: (error: any, result: any) => void) {
    this._contestRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._contestRepository.fetch(callback);
  }

  update(
    _id: string,
    item: IContest,
    callback: (error: any, result: any) => void
  ) {
    this._contestRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._contestRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._contestRepository.delete(_id, callback);
  }

  findById(_id: string, callback: (error: any, result: IContest) => void) {
    this._contestRepository.findById(_id, callback);
  }
}
Object.seal(ContestBusiness);
export = ContestBusiness;

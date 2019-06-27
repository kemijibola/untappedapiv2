import PrizeTypeRepository from '../repository/PrizeTypeRepository';
import IPrizeTypeBusiness from './interface/PrizeTypeBusiness';
import { IPrizeType } from '../models/interfaces';

class PrizeTypeBusiness implements IPrizeTypeBusiness {
  private _prizeTypeRepository: PrizeTypeRepository;

  constructor() {
    this._prizeTypeRepository = new PrizeTypeRepository();
  }

  create(item: IPrizeType, callback: (error: any, result: any) => void) {
    this._prizeTypeRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._prizeTypeRepository.fetch(callback);
  }

  update(
    _id: string,
    item: IPrizeType,
    callback: (error: any, result: any) => void
  ) {
    this._prizeTypeRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._prizeTypeRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._prizeTypeRepository.delete(_id, callback);
  }

  findById(_id: string, callback: (error: any, result: IPrizeType) => void) {
    this._prizeTypeRepository.findById(_id, callback);
  }
}
Object.seal(PrizeTypeBusiness);
export = PrizeTypeBusiness;

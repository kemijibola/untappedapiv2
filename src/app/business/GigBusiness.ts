import GigRepository from '../repository/GigRepository';
import IGigBusiness from './interface/GigBusiness';
import { IGig } from '../models/interfaces';

class GigBusiness implements IGigBusiness {
  private _gigRepository: GigRepository;

  constructor() {
    this._gigRepository = new GigRepository();
  }

  create(item: IGig, callback: (error: any, result: any) => void) {
    this._gigRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._gigRepository.fetch(callback);
  }

  update(_id: string, item: IGig, callback: (error: any, result: any) => void) {
    this._gigRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._gigRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._gigRepository.delete(_id, callback);
  }

  findById(_id: string, callback: (error: any, result: IGig) => void) {
    this._gigRepository.findById(_id, callback);
  }
}
Object.seal(GigBusiness);
export = GigBusiness;

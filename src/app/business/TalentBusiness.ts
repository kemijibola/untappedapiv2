import TalentRepository from '../repository/TalentRepository';
import ITalentBusiness from './interface/TalentBusiness';
import { ITalent } from '../models/interfaces';

class TalentBusiness implements ITalentBusiness {
  private _talentRepository: TalentRepository;

  constructor() {
    this._talentRepository = new TalentRepository();
  }

  create(item: ITalent, callback: (error: any, result: any) => void) {
    this._talentRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._talentRepository.fetch(callback);
  }

  update(
    _id: string,
    item: ITalent,
    callback: (error: any, result: any) => void
  ) {
    this._talentRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._talentRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._talentRepository.delete(_id, callback);
  }

  findById(_id: string, callback: (error: any, result: ITalent) => void) {
    this._talentRepository.findById(_id, callback);
  }
}
Object.seal(TalentBusiness);
export = TalentBusiness;

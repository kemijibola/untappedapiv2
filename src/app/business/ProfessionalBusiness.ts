import ProfessionalRepository from '../repository/ProfessionalRepository';
import IProfessionalBusiness from './interface/ProfessionalBusiness';
import { IProfessional } from '../models/interfaces';

class ProfessionalBusiness implements IProfessionalBusiness {
  private _professionalRepository: ProfessionalRepository;

  constructor() {
    this._professionalRepository = new ProfessionalRepository();
  }

  create(item: IProfessional, callback: (error: any, result: any) => void) {
    this._professionalRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._professionalRepository.fetch(callback);
  }

  update(
    _id: string,
    item: IProfessional,
    callback: (error: any, result: any) => void
  ) {
    this._professionalRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._professionalRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._professionalRepository.delete(_id, callback);
  }

  findById(_id: string, callback: (error: any, result: IProfessional) => void) {
    this._professionalRepository.findById(_id, callback);
  }
}
Object.seal(ProfessionalBusiness);
export = ProfessionalBusiness;

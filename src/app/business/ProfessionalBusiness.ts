import ProfessionalRepository from '../repository/ProfessionalRepository';
import IProfessionalBusiness = require('./interfaces/ProfessionalBusiness');
import { IProfessional } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';

class ProfessionalBusiness implements IProfessionalBusiness {
  private _professionalRepository: ProfessionalRepository;

  constructor() {
    this._professionalRepository = new ProfessionalRepository();
  }

  fetch(): Promise<IProfessional> {
    return this._professionalRepository.fetch();
  }

  findById(id: string): Promise<IProfessional> {
    return this._professionalRepository.findById(id);
  }

  findByCriteria(criteria: any): Promise<IProfessional> {
    return this.findByCriteria(criteria);
  }

  create(item: IProfessional): Promise<IProfessional> {
    return this._professionalRepository.create(item);
  }

  async update(id: string, item: IProfessional): Promise<IProfessional> {
    const permissionModel = await this._professionalRepository.findById(id);
    if (!permissionModel)
      throw new RecordNotFound(`Professional with id: ${id} not found`, 404);
    return this._professionalRepository.update(permissionModel._id, item);
  }

  delete(id: string): Promise<boolean> {
    return this._professionalRepository.delete(id);
  }
}

Object.seal(ProfessionalBusiness);
export = ProfessionalBusiness;

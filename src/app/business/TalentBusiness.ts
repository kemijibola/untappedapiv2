import TalentRepository from '../repository/TalentRepository';
import ITalentBusiness = require('./interfaces/TalentBusiness');
import { ITalent } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';

class TalentBusiness implements ITalentBusiness {
  private _talentRepository: TalentRepository;

  constructor() {
    this._talentRepository = new TalentRepository();
  }

  fetch(): Promise<ITalent> {
    return this._talentRepository.fetch();
  }

  findById(id: string): Promise<ITalent> {
    return this._talentRepository.findById(id);
  }

  findByCriteria(criteria: any): Promise<ITalent> {
    return this.findByCriteria(criteria);
  }

  create(item: ITalent): Promise<ITalent> {
    return this._talentRepository.create(item);
  }

  async update(id: string, item: ITalent): Promise<ITalent> {
    const userTypeModel = await this._talentRepository.findById(id);
    if (!userTypeModel)
      throw new RecordNotFound(`Talent with id: ${id} not found`, 404);
    return this._talentRepository.update(userTypeModel._id, item);
  }

  delete(id: string): Promise<boolean> {
    return this._talentRepository.delete(id);
  }
}

Object.seal(TalentBusiness);
export = TalentBusiness;

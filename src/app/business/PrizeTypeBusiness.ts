import PrizeTypeRepository from '../repository/PrizeTypeRepository';
import IPrizeTypeBusiness = require('./interfaces/PrizeTypeBusiness');
import { IPrizeType } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';

class PrizeTypeBusiness implements IPrizeTypeBusiness {
  private _prizeTypeRepository: PrizeTypeRepository;

  constructor() {
    this._prizeTypeRepository = new PrizeTypeRepository();
  }

  fetch(): Promise<IPrizeType> {
    return this._prizeTypeRepository.fetch();
  }

  findById(id: string): Promise<IPrizeType> {
    return this._prizeTypeRepository.findById(id);
  }

  findByCriteria(criteria: any): Promise<IPrizeType> {
    return this.findByCriteria(criteria);
  }

  create(item: IPrizeType): Promise<IPrizeType> {
    return this._prizeTypeRepository.create(item);
  }

  async update(id: string, item: IPrizeType): Promise<IPrizeType> {
    const prizeTypeModel = await this._prizeTypeRepository.findById(id);
    if (!prizeTypeModel)
      throw new RecordNotFound(`Prize Type with id: ${id} not found`, 404);
    return this._prizeTypeRepository.update(prizeTypeModel._id, item);
  }

  delete(id: string): Promise<boolean> {
    return this._prizeTypeRepository.delete(id);
  }
}

Object.seal(PrizeTypeBusiness);
export = PrizeTypeBusiness;

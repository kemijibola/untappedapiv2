import GigRepository from '../repository/GigRepository';
import IGigBusiness = require('./interfaces/GigBusiness');
import { IGig } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';

class GigBusiness implements IGigBusiness {
  private _gigRepository: GigRepository;

  constructor() {
    this._gigRepository = new GigRepository();
  }

  fetch(): Promise<IGig> {
    return this._gigRepository.fetch();
  }

  findById(id: string): Promise<IGig> {
    return this._gigRepository.findById(id);
  }

  findByCriteria(criteria: any): Promise<IGig> {
    return this.findByCriteria(criteria);
  }

  create(item: IGig): Promise<IGig> {
    return this._gigRepository.create(item);
  }

  async update(id: string, item: IGig): Promise<IGig> {
    const gigModel = await this._gigRepository.findById(id);
    if (!gigModel)
      throw new RecordNotFound(`Comment with id: ${id} not found`, 404);
    return this._gigRepository.update(gigModel._id, item);
  }

  delete(id: string): Promise<boolean> {
    return this._gigRepository.delete(id);
  }
}

Object.seal(GigBusiness);
export = GigBusiness;

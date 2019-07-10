import CountryRepository from '../repository/CountryRepository';
import ICountryBusiness = require('./interfaces/CountryBusiness');
import { ICountry } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';

class CountryBusiness implements ICountryBusiness {
  private _countryRepository: CountryRepository;

  constructor() {
    this._countryRepository = new CountryRepository();
  }

  fetch(): Promise<ICountry> {
    return this._countryRepository.fetch();
  }

  findById(id: string): Promise<ICountry> {
    return this._countryRepository.findById(id);
  }

  findByCriteria(criteria: any): Promise<ICountry> {
    return this.findByCriteria(criteria);
  }

  create(item: ICountry): Promise<ICountry> {
    return this._countryRepository.create(item);
  }

  async update(id: string, item: ICountry): Promise<ICountry> {
    const countryModel = await this._countryRepository.findById(id);
    if (!countryModel)
      throw new RecordNotFound(`Comment with id: ${id} not found`, 404);
    return this._countryRepository.update(countryModel._id, item);
  }

  delete(id: string): Promise<boolean> {
    return this._countryRepository.delete(id);
  }
}

Object.seal(CountryBusiness);
export = CountryBusiness;

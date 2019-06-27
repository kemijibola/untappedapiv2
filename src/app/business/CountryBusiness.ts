import CountryRepository from '../repository/CountryRepository';
import ICountryBusiness from './interface/CountryBusiness';
import { ICountry } from '../models/interfaces';

class CountryBusiness implements ICountryBusiness {
  private _countryRepository: CountryRepository;

  constructor() {
    this._countryRepository = new CountryRepository();
  }

  create(item: ICountry, callback: (error: any, result: any) => void) {
    this._countryRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._countryRepository.fetch(callback);
  }

  update(
    _id: string,
    item: ICountry,
    callback: (error: any, result: any) => void
  ) {
    this._countryRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._countryRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._countryRepository.delete(_id, callback);
  }

  findById(_id: string, callback: (error: any, result: ICountry) => void) {
    this._countryRepository.findById(_id, callback);
  }
}
Object.seal(CountryBusiness);
export = CountryBusiness;

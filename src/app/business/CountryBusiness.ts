import CountryRepository from '../repository/CountryRepository';
import ICountryBusiness = require('./interfaces/CountryBusiness');
import { ICountry } from '../models/interfaces';
import { Result } from '../../utils/Result';

class CountryBusiness implements ICountryBusiness {
  private _countryRepository: CountryRepository;

  constructor() {
    this._countryRepository = new CountryRepository();
  }

  async fetch(): Promise<Result<ICountry>> {
    try {
      const countries = await this._countryRepository.fetch();
      return Result.ok<ICountry>(200, countries);
    } catch (err) {
      return Result.fail<ICountry>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findById(id: string): Promise<Result<ICountry>> {
    try {
      const country = await this._countryRepository.findById(id);
      if (!country)
        return Result.fail<ICountry>(404, `Country of Id ${id} not found`);
      else return Result.ok<ICountry>(200, country);
    } catch (err) {
      return Result.fail<ICountry>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async findByCriteria(criteria: any): Promise<Result<ICountry>> {
    try {
      const country = await this._countryRepository.findByCriteria(criteria);
      if (!country) return Result.fail<ICountry>(404, `Country not found`);
      else return Result.ok<ICountry>(200, country);
    } catch (err) {
      return Result.fail<ICountry>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async create(item: ICountry): Promise<Result<ICountry>> {
    try {
      const newCountry = await this._countryRepository.create(item);
      return Result.ok<ICountry>(200, newCountry);
    } catch (err) {
      return Result.fail<ICountry>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async update(id: string, item: ICountry): Promise<Result<ICountry>> {
    try {
      const country = await this._countryRepository.findById(id);
      if (!country)
        return Result.fail<ICountry>(
          404,
          `Could not update country.Country of Id ${id} not found`
        );
      const updateObj = await this._countryRepository.update(country._id, item);
      return Result.ok<ICountry>(200, updateObj);
    } catch (err) {
      return Result.fail<ICountry>(
        500,
        `Internal server error occured. ${err}`
      );
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._countryRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      return Result.fail<boolean>(500, `Internal server error occured. ${err}`);
    }
  }
}

Object.seal(CountryBusiness);
export = CountryBusiness;

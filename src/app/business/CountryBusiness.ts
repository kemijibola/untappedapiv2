import CountryRepository from "../repository/CountryRepository";
import ICountryBusiness = require("./interfaces/CountryBusiness");
import { ICountry } from "../models/interfaces";
import { Result } from "../../utils/Result";

class CountryBusiness implements ICountryBusiness {
  private _countryRepository: CountryRepository;

  constructor() {
    this._countryRepository = new CountryRepository();
  }

  async fetch(condition: any): Promise<Result<ICountry[]>> {
    const countries = await this._countryRepository.fetch(condition);
    return Result.ok<ICountry[]>(200, countries);
  }

  async findById(id: string): Promise<Result<ICountry>> {
    if (!id) return Result.fail<ICountry>(400, "Bad request.");
    const country = await this._countryRepository.findById(id);
    if (!country)
      return Result.fail<ICountry>(404, `Country of Id ${id} not found`);
    return Result.ok<ICountry>(200, country);
  }

  async findOne(condition: any): Promise<Result<ICountry>> {
    if (!condition) return Result.fail<ICountry>(400, "Bad request.");
    const country = await this._countryRepository.findByOne(condition);
    if (!country) return Result.fail<ICountry>(404, `Country not found`);
    return Result.ok<ICountry>(200, country);
  }

  async findByCriteria(criteria: any): Promise<Result<ICountry>> {
    const country = await this._countryRepository.findByCriteria(criteria);
    if (!country) return Result.fail<ICountry>(404, `Country not found`);
    return Result.ok<ICountry>(200, country);
  }

  async create(item: ICountry): Promise<Result<ICountry>> {
    const newCountry = await this._countryRepository.create(item);
    return Result.ok<ICountry>(200, newCountry);
  }

  async update(id: string, item: ICountry): Promise<Result<ICountry>> {
    const country = await this._countryRepository.findById(id);
    if (!country)
      return Result.fail<ICountry>(
        404,
        `Could not update country.Country with Id ${id} not found`
      );
    const updateObj = await this._countryRepository.update(country._id, item);
    return Result.ok<ICountry>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._countryRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(CountryBusiness);
export = CountryBusiness;

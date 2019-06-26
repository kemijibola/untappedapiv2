import { ICountry } from './interfaces';

class CountryModel {
  private _countryModel: ICountry;
  constructor(private countryModel: ICountry) {
    this._countryModel = countryModel;
  }

  get name(): string {
    return this._countryModel.name;
  }
  get states(): string[] {
    return this._countryModel.states;
  }
}

Object.seal(CountryModel);
export = CountryModel;

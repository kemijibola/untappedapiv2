import { ICountry } from '../models/interfaces';
import { CountrySchema } from '../data/schema/Country';
import RepositoryBase from './base/RepositoryBase';

class CountryRepository extends RepositoryBase<ICountry> {
  constructor() {
    super(CountrySchema);
  }
}

Object.seal(CountryRepository);
export = CountryRepository;

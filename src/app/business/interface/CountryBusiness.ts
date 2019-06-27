import BaseBusiness = require('./base/BaseBusiness');
import { ICountry } from '../../models/interfaces';

interface CountryBusiness extends BaseBusiness<ICountry> {}
export = CountryBusiness;

import BaseBusiness = require('./base/BaseBusiness');
import { ICategory } from '../../models/interfaces';

interface CategoryBusiness extends BaseBusiness<ICategory> {}
export = CategoryBusiness;

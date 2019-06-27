import BaseBusiness = require('./base/BaseBusiness');
import { IContest } from '../../models/interfaces';

interface ContestBusiness extends BaseBusiness<IContest> {}
export = ContestBusiness;

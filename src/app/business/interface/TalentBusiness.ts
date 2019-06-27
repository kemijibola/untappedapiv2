import BaseBusiness = require('./base/BaseBusiness');
import { ITalent } from '../../models/interfaces';

interface TalentBusiness extends BaseBusiness<ITalent> {}
export = TalentBusiness;

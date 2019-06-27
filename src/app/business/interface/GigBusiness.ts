import BaseBusiness = require('./base/BaseBusiness');
import { IGig } from '../../models/interfaces';

interface GigBusiness extends BaseBusiness<IGig> {}
export = GigBusiness;

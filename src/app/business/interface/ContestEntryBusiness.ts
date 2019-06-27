import BaseBusiness = require('./base/BaseBusiness');
import { IContestEntry } from '../../models/interfaces';

interface ContestEntryBusiness extends BaseBusiness<IContestEntry> {}
export = ContestEntryBusiness;

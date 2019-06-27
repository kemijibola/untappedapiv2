import BaseBusiness = require('./base/BaseBusiness');
import { IScheduledEmail } from '../../models/interfaces';

interface ScheduledEmailBusiness extends BaseBusiness<IScheduledEmail> {}
export = ScheduledEmailBusiness;

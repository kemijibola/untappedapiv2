import BaseBusiness from './base/BaseBusiness';
import { IDomain } from '../../models/interfaces';

interface DomainBusiness extends BaseBusiness<IDomain> {}
export = DomainBusiness;

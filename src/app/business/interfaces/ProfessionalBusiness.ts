import BaseBusiness from './base/BaseBusiness';
import { IProfessional } from '../../models/interfaces';

interface ProfessionalBusiness extends BaseBusiness<IProfessional> {}
export = ProfessionalBusiness;

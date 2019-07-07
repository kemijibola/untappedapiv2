import { IProfessional } from '../models/interfaces';
import { ProfessionalSchema } from '../data/schema/Professional';
import RepositoryBase from './base/RepositoryBase';

class ProfessionalRepository extends RepositoryBase<IProfessional> {
  constructor() {
    super(ProfessionalSchema);
  }
}

Object.seal(ProfessionalRepository);
export = ProfessionalRepository;

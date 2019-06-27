import { ITalent } from '../models/interfaces';
import TalentSchema from '../data/schema/Talent';
import RepositoryBase from './base/RepositoryBase';

class TalentRepository extends RepositoryBase<ITalent> {
  constructor() {
    super(TalentSchema);
  }
}

Object.seal(TalentRepository);
export = TalentRepository;

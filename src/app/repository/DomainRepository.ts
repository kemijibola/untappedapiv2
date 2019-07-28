import { IDomain } from '../models/interfaces';
import { DomainSchema } from '../data/schema/Domain';
import RepositoryBase from './base/RepositoryBase';

class DomainRepository extends RepositoryBase<IDomain> {
  constructor() {
    super(DomainSchema);
  }
}

Object.seal(DomainRepository);
export = DomainRepository;

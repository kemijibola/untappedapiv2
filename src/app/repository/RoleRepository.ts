import { IRole } from '../models/interfaces';
import { RoleSchema } from '../data/schema/Role';
import RepositoryBase from './base/RepositoryBase';

class RoleRepository extends RepositoryBase<IRole> {
  constructor() {
    super(RoleSchema);
  }
}

Object.seal(RoleRepository);
export = RoleRepository;

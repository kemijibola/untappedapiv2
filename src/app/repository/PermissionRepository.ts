import { IPermission } from '../models/interfaces';
import { PermissionSchema } from '../data/schema/Permission';
import RepositoryBase from './base/RepositoryBase';

class PermissionRepository extends RepositoryBase<IPermission> {
  constructor() {
    super(PermissionSchema);
  }
}

Object.seal(PermissionRepository);
export = PermissionRepository;

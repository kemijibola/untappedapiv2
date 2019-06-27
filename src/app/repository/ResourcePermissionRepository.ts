import { IResourcePermission } from '../models/interfaces';
import ResourcePermissionSchema from '../data/schema/ResourcePermission';
import RepositoryBase from './base/RepositoryBase';

class ResourcePermissionRepository extends RepositoryBase<IResourcePermission> {
  constructor() {
    super(ResourcePermissionSchema);
  }
}

Object.seal(ResourcePermissionRepository);
export = ResourcePermissionRepository;

import { IResource } from '../models/interfaces';
import { ResourceSchema } from '../data/schema/Resource';
import RepositoryBase from './base/RepositoryBase';

class ResourceRepository extends RepositoryBase<IResource> {
  constructor() {
    super(ResourceSchema);
  }
}

Object.seal(ResourceRepository);
export = ResourceRepository;

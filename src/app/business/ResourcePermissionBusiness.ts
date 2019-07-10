import ResourcePermissionRepository from '../repository/ResourcePermissionRepository';
import IResourcePermissionBusiness = require('./interfaces/ResourcePermissionBusiness');
import { IResourcePermission } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';

class ResourcePermissionBusiness implements IResourcePermissionBusiness {
  private _resourcePermissionRepository: ResourcePermissionRepository;

  constructor() {
    this._resourcePermissionRepository = new ResourcePermissionRepository();
  }

  fetch(): Promise<IResourcePermission> {
    return this._resourcePermissionRepository.fetch();
  }

  findById(id: string): Promise<IResourcePermission> {
    return this._resourcePermissionRepository.findById(id);
  }

  findByCriteria(criteria: any): Promise<IResourcePermission> {
    return this.findByCriteria(criteria);
  }

  create(item: IResourcePermission): Promise<IResourcePermission> {
    return this._resourcePermissionRepository.create(item);
  }

  async update(id: string, item: IResourcePermission): Promise<IResourcePermission> {
    const resourcePermissionModel = await this._resourcePermissionRepository.findById(
      id
    );
    if (!resourcePermissionModel)
      throw new RecordNotFound(`Resource Permission with id: ${id} not found`, 404);
    return this._resourcePermissionRepository.update(resourcePermissionModel._id, item);
  }

  delete(id: string): Promise<boolean> {
    return this._resourcePermissionRepository.delete(id);
  }
}

Object.seal(ResourcePermissionBusiness);
export = ResourcePermissionBusiness;

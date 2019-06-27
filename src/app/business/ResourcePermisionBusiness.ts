import ResourcePermissionRepository from '../repository/ResourcePermissionRepository';
import IResourcePermissionBusiness from './interface/ResourcePermisionBusiness';
import { IResourcePermission } from '../models/interfaces';

class ResourcePermissionBusiness implements IResourcePermissionBusiness {
  private _resourcePermissionRepository: ResourcePermissionRepository;

  constructor() {
    this._resourcePermissionRepository = new ResourcePermissionRepository();
  }

  create(
    item: IResourcePermission,
    callback: (error: any, result: any) => void
  ) {
    this._resourcePermissionRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._resourcePermissionRepository.fetch(callback);
  }

  update(
    _id: string,
    item: IResourcePermission,
    callback: (error: any, result: any) => void
  ) {
    this._resourcePermissionRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._resourcePermissionRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._resourcePermissionRepository.delete(_id, callback);
  }

  findById(
    _id: string,
    callback: (error: any, result: IResourcePermission) => void
  ) {
    this._resourcePermissionRepository.findById(_id, callback);
  }
}
Object.seal(ResourcePermissionBusiness);
export = ResourcePermissionBusiness;

import PermissionRepository from '../repository/PermissionRepository';
import IPermissionBusiness from './interface/PermissionBusiness';
import { IGig, IPermission } from '../models/interfaces';

class PermissionBusiness implements IPermissionBusiness {
  private _permissionRepository: PermissionRepository;

  constructor() {
    this._permissionRepository = new PermissionRepository();
  }

  create(item: IPermission, callback: (error: any, result: any) => void) {
    this._permissionRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._permissionRepository.fetch(callback);
  }

  update(
    _id: string,
    item: IPermission,
    callback: (error: any, result: any) => void
  ) {
    this._permissionRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._permissionRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._permissionRepository.delete(_id, callback);
  }

  findById(_id: string, callback: (error: any, result: IPermission) => void) {
    this._permissionRepository.findById(_id, callback);
  }
}
Object.seal(PermissionBusiness);
export = PermissionBusiness;

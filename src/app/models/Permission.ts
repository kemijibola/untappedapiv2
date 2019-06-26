import { IPermission } from './interfaces';

class PermissionModel {
  private _permissionModel: IPermission;
  constructor(permissionModel: IPermission) {
    this._permissionModel = permissionModel;
  }

  get name(): string {
    return this._permissionModel.name;
  }
}

Object.seal(PermissionModel);
export = PermissionModel;

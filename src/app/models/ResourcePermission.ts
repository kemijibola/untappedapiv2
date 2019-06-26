import {
  IResourcePermission,
  IResource,
  IRole,
  IPermission
} from './interfaces';

class ResourcePermissionModel {
  private _resourcePermissionModel: IResourcePermission;
  constructor(resourcePermissionModel: IResourcePermission) {
    this._resourcePermissionModel = resourcePermissionModel;
  }

  get resource(): IResource {
    return this._resourcePermissionModel.resource;
  }
  get role(): IRole {
    return this._resourcePermissionModel.role;
  }
  get permissions(): IPermission[] {
    return this._resourcePermissionModel.permissions;
  }
}

Object.seal(ResourcePermissionModel);
export = ResourcePermissionModel;

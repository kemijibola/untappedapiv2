import { IRole, IUserType, RoleType } from './interfaces';

class RoleModel {
  private _roleModel: IRole;
  constructor(roleModel: IRole) {
    this._roleModel = roleModel;
  }

  get name(): string {
    return this._roleModel.name;
  }
  get userType(): IUserType {
    return this._roleModel.userType;
  }
  get roleType(): RoleType {
    return this._roleModel.roleType;
  }
}

Object.seal(RoleModel);
export = RoleModel;

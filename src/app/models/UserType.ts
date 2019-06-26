import { IUserType } from './interfaces';

class UserTypeModel {
  private _userTypeModel: IUserType;
  constructor(userTypeModel: IUserType) {
    this._userTypeModel = userTypeModel;
  }
  get name(): string {
    return this._userTypeModel.name;
  }
  get global(): boolean {
    return this._userTypeModel.global;
  }
  get description(): string {
    return this._userTypeModel.description;
  }
}

Object.seal(UserTypeModel);
export = UserTypeModel;

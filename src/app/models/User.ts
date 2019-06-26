import { IUser, IUserAccountStatus, IRole } from './interfaces';

class UserModel {
  private _userModel: IUser;
  constructor(userModel: IUser) {
    this._userModel = userModel;
  }

  get email(): string {
    return this._userModel.email;
  }
  get name(): string {
    return this._userModel.name;
  }
  get password(): string {
    return this._userModel.password;
  }
  get isEmailConfirmed(): boolean {
    return this._userModel.isEmailConfirmed;
  }
  get isPhoneConfirmed(): boolean {
    return this._userModel.isPhoneConfirmed;
  }
  get isProfileCompleted(): boolean {
    return this._userModel.isProfileCompleted;
  }
  get generalNotification(): boolean {
    return this._userModel.generalNotification;
  }
  get emailNotification(): boolean {
    return this._userModel.emailNotification;
  }
  get profileVisibility(): boolean {
    return this._userModel.profileVisibility;
  }
  get loginCount(): number {
    return this._userModel.loginCount;
  }
  get status(): IUserAccountStatus {
    return this._userModel.status;
  }
  get roles(): IRole[] {
    return this._userModel.roles;
  }
  get lastLogin(): Date {
    return this._userModel.lastLogin;
  }
}

Object.seal(UserModel);
export = UserModel;

"use strict";
class UserModel {
    constructor(userModel) {
        this._userModel = userModel;
    }
    get email() {
        return this._userModel.email;
    }
    get name() {
        return this._userModel.name;
    }
    get password() {
        return this._userModel.password;
    }
    get isEmailConfirmed() {
        return this._userModel.isEmailConfirmed;
    }
    get isPhoneConfirmed() {
        return this._userModel.isPhoneConfirmed;
    }
    get isProfileCompleted() {
        return this._userModel.isProfileCompleted;
    }
    get generalNotification() {
        return this._userModel.generalNotification;
    }
    get emailNotification() {
        return this._userModel.emailNotification;
    }
    get profileVisibility() {
        return this._userModel.profileVisibility;
    }
    get loginCount() {
        return this._userModel.loginCount;
    }
    get status() {
        return this._userModel.status;
    }
    get roles() {
        return this._userModel.roles;
    }
    get lastLogin() {
        return this._userModel.lastLogin;
    }
}
Object.seal(UserModel);
module.exports = UserModel;

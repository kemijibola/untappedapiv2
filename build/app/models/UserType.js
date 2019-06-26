"use strict";
class UserTypeModel {
    constructor(userTypeModel) {
        this._userTypeModel = userTypeModel;
    }
    get name() {
        return this._userTypeModel.name;
    }
    get global() {
        return this._userTypeModel.global;
    }
    get description() {
        return this._userTypeModel.description;
    }
}
Object.seal(UserTypeModel);
module.exports = UserTypeModel;

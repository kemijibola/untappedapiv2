"use strict";
class RoleModel {
    constructor(roleModel) {
        this._roleModel = roleModel;
    }
    get name() {
        return this._roleModel.name;
    }
    get userType() {
        return this._roleModel.userType;
    }
    get roleType() {
        return this._roleModel.roleType;
    }
}
Object.seal(RoleModel);
module.exports = RoleModel;

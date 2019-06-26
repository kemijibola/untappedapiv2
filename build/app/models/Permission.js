"use strict";
class PermissionModel {
    constructor(permissionModel) {
        this._permissionModel = permissionModel;
    }
    get name() {
        return this._permissionModel.name;
    }
}
Object.seal(PermissionModel);
module.exports = PermissionModel;

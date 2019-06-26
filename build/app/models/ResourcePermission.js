"use strict";
class ResourcePermissionModel {
    constructor(resourcePermissionModel) {
        this._resourcePermissionModel = resourcePermissionModel;
    }
    get resource() {
        return this._resourcePermissionModel.resource;
    }
    get role() {
        return this._resourcePermissionModel.role;
    }
    get permissions() {
        return this._resourcePermissionModel.permissions;
    }
}
Object.seal(ResourcePermissionModel);
module.exports = ResourcePermissionModel;

"use strict";
var ResourcePermissionModel = /** @class */ (function () {
    function ResourcePermissionModel(resourcePermissionModel) {
        this._resourcePermissionModel = resourcePermissionModel;
    }
    Object.defineProperty(ResourcePermissionModel.prototype, "resource", {
        get: function () {
            return this._resourcePermissionModel.resource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourcePermissionModel.prototype, "role", {
        get: function () {
            return this._resourcePermissionModel.role;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourcePermissionModel.prototype, "permissions", {
        get: function () {
            return this._resourcePermissionModel.permissions;
        },
        enumerable: true,
        configurable: true
    });
    return ResourcePermissionModel;
}());
Object.seal(ResourcePermissionModel);
module.exports = ResourcePermissionModel;
//# sourceMappingURL=ResourcePermission.js.map
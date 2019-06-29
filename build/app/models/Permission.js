"use strict";
var PermissionModel = /** @class */ (function () {
    function PermissionModel(permissionModel) {
        this._permissionModel = permissionModel;
    }
    Object.defineProperty(PermissionModel.prototype, "name", {
        get: function () {
            return this._permissionModel.name;
        },
        enumerable: true,
        configurable: true
    });
    return PermissionModel;
}());
Object.seal(PermissionModel);
module.exports = PermissionModel;
//# sourceMappingURL=Permission.js.map
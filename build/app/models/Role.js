"use strict";
var RoleModel = /** @class */ (function () {
    function RoleModel(roleModel) {
        this._roleModel = roleModel;
    }
    Object.defineProperty(RoleModel.prototype, "name", {
        get: function () {
            return this._roleModel.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleModel.prototype, "userType", {
        get: function () {
            return this._roleModel.userType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleModel.prototype, "roleType", {
        get: function () {
            return this._roleModel.roleType;
        },
        enumerable: true,
        configurable: true
    });
    return RoleModel;
}());
Object.seal(RoleModel);
module.exports = RoleModel;
//# sourceMappingURL=Role.js.map
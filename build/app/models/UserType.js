"use strict";
var UserTypeModel = /** @class */ (function () {
    function UserTypeModel(userTypeModel) {
        this._userTypeModel = userTypeModel;
    }
    Object.defineProperty(UserTypeModel.prototype, "name", {
        get: function () {
            return this._userTypeModel.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserTypeModel.prototype, "global", {
        get: function () {
            return this._userTypeModel.global;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserTypeModel.prototype, "description", {
        get: function () {
            return this._userTypeModel.description;
        },
        enumerable: true,
        configurable: true
    });
    return UserTypeModel;
}());
Object.seal(UserTypeModel);
module.exports = UserTypeModel;
//# sourceMappingURL=UserType.js.map
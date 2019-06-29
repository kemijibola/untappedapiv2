"use strict";
var UserModel = /** @class */ (function () {
    function UserModel(userModel) {
        this._userModel = userModel;
    }
    Object.defineProperty(UserModel.prototype, "email", {
        get: function () {
            return this._userModel.email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "name", {
        get: function () {
            return this._userModel.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "password", {
        get: function () {
            return this._userModel.password;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "isEmailConfirmed", {
        get: function () {
            return this._userModel.isEmailConfirmed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "isPhoneConfirmed", {
        get: function () {
            return this._userModel.isPhoneConfirmed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "isProfileCompleted", {
        get: function () {
            return this._userModel.isProfileCompleted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "generalNotification", {
        get: function () {
            return this._userModel.generalNotification;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "emailNotification", {
        get: function () {
            return this._userModel.emailNotification;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "profileVisibility", {
        get: function () {
            return this._userModel.profileVisibility;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "loginCount", {
        get: function () {
            return this._userModel.loginCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "status", {
        get: function () {
            return this._userModel.status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "roles", {
        get: function () {
            return this._userModel.roles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "lastLogin", {
        get: function () {
            return this._userModel.lastLogin;
        },
        enumerable: true,
        configurable: true
    });
    return UserModel;
}());
Object.seal(UserModel);
module.exports = UserModel;
//# sourceMappingURL=User.js.map
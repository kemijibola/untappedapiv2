"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var User_1 = require("../data/schema/User");
var RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
var UserRepository = /** @class */ (function (_super) {
    __extends(UserRepository, _super);
    function UserRepository() {
        var _this = _super.call(this, User_1.UserSchema) || this;
        _this.userModel = User_1.UserSchema;
        return _this;
    }
    UserRepository.prototype.register = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.userModel.create(user, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    };
    UserRepository.prototype.userTypeByUser = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.userModel
                .findById(user)
                .populate('userType', 'name', function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    };
    return UserRepository;
}(RepositoryBase_1.default));
Object.seal(UserRepository);
module.exports = UserRepository;
//# sourceMappingURL=UserRepository.js.map
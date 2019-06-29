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
var ResourcePermission_1 = __importDefault(require("../data/schema/ResourcePermission"));
var RepositoryBase_1 = __importDefault(require("./base/RepositoryBase"));
var ResourcePermissionRepository = /** @class */ (function (_super) {
    __extends(ResourcePermissionRepository, _super);
    function ResourcePermissionRepository() {
        var _this = _super.call(this, ResourcePermission_1.default) || this;
        _this.resourcePermissionModel = ResourcePermission_1.default;
        return _this;
    }
    ResourcePermissionRepository.prototype.findPermissionsByRole = function (role, resource) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.resourcePermissionModel
                .findOne({
                role: role,
                resource: resource
            }, function (error, result) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            })
                .populate('permissions');
        });
        return promise;
    };
    return ResourcePermissionRepository;
}(RepositoryBase_1.default));
Object.seal(ResourcePermissionRepository);
module.exports = ResourcePermissionRepository;
//# sourceMappingURL=ResourcePermissionRepository.js.map
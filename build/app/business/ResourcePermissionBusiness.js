"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ResourcePermissionRepository_1 = __importDefault(require("../repository/ResourcePermissionRepository"));
var ResourceRepository_1 = __importDefault(require("../repository/ResourceRepository"));
var RoleRepository_1 = __importDefault(require("../repository/RoleRepository"));
var PermissionRepository_1 = __importDefault(require("../repository/PermissionRepository"));
var Result_1 = require("../../utils/Result");
var lib_1 = require("../../utils/lib");
var ResourcePermissionBusiness = /** @class */ (function () {
    function ResourcePermissionBusiness() {
        this._resourcePermissionRepository = new ResourcePermissionRepository_1.default();
        this._resourceRepository = new ResourceRepository_1.default();
        this._roleRepository = new RoleRepository_1.default();
        this._permissionRepository = new PermissionRepository_1.default();
    }
    ResourcePermissionBusiness.prototype.fetch = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var resourcePermissions, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._resourcePermissionRepository.fetch(condition)];
                    case 1:
                        resourcePermissions = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, resourcePermissions)];
                    case 2:
                        err_1 = _a.sent();
                        throw new Error("InternalServer error occured." + err_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ResourcePermissionBusiness.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var resourcePermission, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._resourcePermissionRepository.findById(id)];
                    case 1:
                        resourcePermission = _a.sent();
                        if (!resourcePermission)
                            return [2 /*return*/, Result_1.Result.fail(404, "Resource permission of Id " + id + " not found")];
                        else
                            return [2 /*return*/, Result_1.Result.ok(200, resourcePermission)];
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        throw new Error("InternalServer error occured." + err_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ResourcePermissionBusiness.prototype.findByCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var resourcePermission, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._resourcePermissionRepository.findByCriteria(criteria)];
                    case 1:
                        resourcePermission = _a.sent();
                        if (!resourcePermission)
                            return [2 /*return*/, Result_1.Result.fail(404, "Resource permission not found")];
                        else
                            return [2 /*return*/, Result_1.Result.ok(200, resourcePermission)];
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        throw new Error("InternalServer error occured." + err_3.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ResourcePermissionBusiness.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var resource, role, permissionIds, _i, _a, key, permission, resourcePermission, newResourcePermission, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 11, , 12]);
                        return [4 /*yield*/, this._resourceRepository.findById(item.resource)];
                    case 1:
                        resource = _b.sent();
                        if (!resource)
                            return [2 /*return*/, Result_1.Result.fail(400, "Resource id " + item.resource + " is not a valid resource")];
                        return [4 /*yield*/, this._roleRepository.findById(item.role)];
                    case 2:
                        role = _b.sent();
                        if (!role)
                            return [2 /*return*/, Result_1.Result.fail(400, "Role id " + item.role + " is not a valid role")];
                        permissionIds = [];
                        _i = 0, _a = item.permissions;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        key = _a[_i];
                        return [4 /*yield*/, this._permissionRepository.findById(key)];
                    case 4:
                        permission = _b.sent();
                        if (!permission)
                            return [2 /*return*/, Result_1.Result.fail(400, "Permission id " + key + " is not a valid Permission")];
                        permissionIds.push(lib_1.toObjectId(key));
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [4 /*yield*/, this._resourcePermissionRepository.findByCriteria({
                            resource: resource._id,
                            role: role._id
                        })];
                    case 7:
                        resourcePermission = _b.sent();
                        if (!(resourcePermission !== null)) return [3 /*break*/, 9];
                        resourcePermission.permissions = permissionIds.slice();
                        return [4 /*yield*/, resourcePermission.save()];
                    case 8:
                        _b.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, resourcePermission)];
                    case 9: return [4 /*yield*/, this._resourcePermissionRepository.create(item)];
                    case 10:
                        newResourcePermission = _b.sent();
                        return [2 /*return*/, Result_1.Result.ok(201, newResourcePermission)];
                    case 11:
                        err_4 = _b.sent();
                        throw new Error("InternalServer error occured." + err_4.message);
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    ResourcePermissionBusiness.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var resourcePermission, updateObj, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this._resourcePermissionRepository.findById(id)];
                    case 1:
                        resourcePermission = _a.sent();
                        if (!resourcePermission._id)
                            return [2 /*return*/, Result_1.Result.fail(404, "Could not update resource permission.Resource permission with Id " + id + " not found")];
                        return [4 /*yield*/, this._resourcePermissionRepository.update(resourcePermission._id, item)];
                    case 2:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("InternalServer error occured." + err_5.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ResourcePermissionBusiness.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isDeleted, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._resourcePermissionRepository.delete(id)];
                    case 1:
                        isDeleted = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, isDeleted)];
                    case 2:
                        err_6 = _a.sent();
                        throw new Error("InternalServer error occured." + err_6.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ResourcePermissionBusiness;
}());
Object.seal(ResourcePermissionBusiness);
module.exports = ResourcePermissionBusiness;
//# sourceMappingURL=ResourcePermissionBusiness.js.map
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
var RolePermissionRepository_1 = __importDefault(require("../repository/RolePermissionRepository"));
var RoleRepository_1 = __importDefault(require("../repository/RoleRepository"));
var PermissionRepository_1 = __importDefault(require("../repository/PermissionRepository"));
var UserTypeRepository_1 = __importDefault(require("../repository/UserTypeRepository"));
var Result_1 = require("../../utils/Result");
var RolePermissionBusiness = /** @class */ (function () {
    function RolePermissionBusiness() {
        this._rolePermissionRepository = new RolePermissionRepository_1.default();
        this._roleRepository = new RoleRepository_1.default();
        this._permissionRepository = new PermissionRepository_1.default();
        this._userTypeRepository = new UserTypeRepository_1.default();
    }
    RolePermissionBusiness.prototype.fetch = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var rolePermissions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._rolePermissionRepository.fetch(condition)];
                    case 1:
                        rolePermissions = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, rolePermissions)];
                }
            });
        });
    };
    RolePermissionBusiness.prototype.fetchWithPermission = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var rolePermissions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._rolePermissionRepository.populateFetch("permission", condition)];
                    case 1:
                        rolePermissions = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, rolePermissions)];
                }
            });
        });
    };
    RolePermissionBusiness.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rolePermission;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request")];
                        return [4 /*yield*/, this._rolePermissionRepository.findById(id)];
                    case 1:
                        rolePermission = _a.sent();
                        if (!rolePermission)
                            return [2 /*return*/, Result_1.Result.fail(404, "Role permission not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, rolePermission)];
                }
            });
        });
    };
    RolePermissionBusiness.prototype.findOne = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var rolePermission;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!condition)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request")];
                        return [4 /*yield*/, this._rolePermissionRepository.findByOne(condition)];
                    case 1:
                        rolePermission = _a.sent();
                        if (!rolePermission)
                            return [2 /*return*/, Result_1.Result.fail(404, "Role permission not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, rolePermission)];
                }
            });
        });
    };
    RolePermissionBusiness.prototype.findByCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var rolePermission;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._rolePermissionRepository.findByCriteria(criteria)];
                    case 1:
                        rolePermission = _a.sent();
                        if (!rolePermission)
                            return [2 /*return*/, Result_1.Result.fail(404, "Resource not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, rolePermission)];
                }
            });
        });
    };
    RolePermissionBusiness.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var role, permission, userType, rolePermission, newRolePermission;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._roleRepository.findById(item.role)];
                    case 1:
                        role = _a.sent();
                        if (!role) {
                            return [2 /*return*/, Result_1.Result.fail(400, "Role not found")];
                        }
                        if (!role.isActive) {
                            return [2 /*return*/, Result_1.Result.fail(400, "Role has not been activated for use")];
                        }
                        return [4 /*yield*/, this._permissionRepository.findById(item.permission)];
                    case 2:
                        permission = _a.sent();
                        if (!permission) {
                            return [2 /*return*/, Result_1.Result.fail(400, "Permission not found")];
                        }
                        if (!permission.isActive) {
                            return [2 /*return*/, Result_1.Result.fail(400, "Permission has not been activated for use")];
                        }
                        return [4 /*yield*/, this._userTypeRepository.findById(item.userType)];
                    case 3:
                        userType = _a.sent();
                        if (!userType)
                            return [2 /*return*/, Result_1.Result.fail(400, "UserType not found")];
                        return [4 /*yield*/, this._rolePermissionRepository.findByCriteria({
                                role: item.role,
                                permission: item.permission,
                                userType: item.userType,
                            })];
                    case 4:
                        rolePermission = _a.sent();
                        if (!(rolePermission === null)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this._rolePermissionRepository.create(item)];
                    case 5:
                        newRolePermission = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(201, newRolePermission)];
                    case 6: return [2 /*return*/, Result_1.Result.fail(409, "Role has already been mapped to permission")];
                }
            });
        });
    };
    RolePermissionBusiness.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var rolePermission, updateObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._rolePermissionRepository.findById(id)];
                    case 1:
                        rolePermission = _a.sent();
                        if (!rolePermission)
                            return [2 /*return*/, Result_1.Result.fail(404, "Role permission not found")];
                        return [4 /*yield*/, this._rolePermissionRepository.update(rolePermission._id, item)];
                    case 2:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                }
            });
        });
    };
    RolePermissionBusiness.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isDeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._rolePermissionRepository.delete(id)];
                    case 1:
                        isDeleted = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, isDeleted)];
                }
            });
        });
    };
    return RolePermissionBusiness;
}());
Object.seal(RolePermissionBusiness);
module.exports = RolePermissionBusiness;
//# sourceMappingURL=RolePermissionBusiness.js.map
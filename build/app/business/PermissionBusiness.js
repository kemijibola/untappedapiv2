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
var PermissionRepository_1 = __importDefault(require("../repository/PermissionRepository"));
var RoleRepository_1 = __importDefault(require("../repository/RoleRepository"));
var Result_1 = require("../../utils/Result");
var PermissionBusiness = /** @class */ (function () {
    function PermissionBusiness() {
        this._permissionRepository = new PermissionRepository_1.default();
        this._roleRepository = new RoleRepository_1.default();
    }
    PermissionBusiness.prototype.fetch = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var permissions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._permissionRepository.fetch(condition)];
                    case 1:
                        permissions = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, permissions)];
                }
            });
        });
    };
    PermissionBusiness.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var permission;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request")];
                        return [4 /*yield*/, this._permissionRepository.findById(id)];
                    case 1:
                        permission = _a.sent();
                        if (!permission)
                            return [2 /*return*/, Result_1.Result.fail(404, "Permission of Id " + id + " not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, permission)];
                }
            });
        });
    };
    PermissionBusiness.prototype.findOne = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var permission;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!condition)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request")];
                        return [4 /*yield*/, this._permissionRepository.findByOne(condition)];
                    case 1:
                        permission = _a.sent();
                        if (!permission)
                            return [2 /*return*/, Result_1.Result.fail(404, "Permission not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, permission)];
                }
            });
        });
    };
    PermissionBusiness.prototype.findByCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var permission;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._permissionRepository.findByCriteria(criteria)];
                    case 1:
                        permission = _a.sent();
                        if (!permission)
                            return [2 /*return*/, Result_1.Result.fail(404, "Permission not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, permission)];
                }
            });
        });
    };
    PermissionBusiness.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var permission, newPermission;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._permissionRepository.findByCriteria({
                            name: item.name,
                        })];
                    case 1:
                        permission = _a.sent();
                        if (!(permission === null)) return [3 /*break*/, 3];
                        item.isActive = false;
                        return [4 /*yield*/, this._permissionRepository.create(item)];
                    case 2:
                        newPermission = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(201, newPermission)];
                    case 3: return [2 /*return*/, Result_1.Result.fail(409, permission.name + " already exist.")];
                }
            });
        });
    };
    PermissionBusiness.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var permission, updateObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._permissionRepository.findById(id)];
                    case 1:
                        permission = _a.sent();
                        if (!permission)
                            return [2 /*return*/, Result_1.Result.fail(404, "Permission not found")];
                        return [4 /*yield*/, this._permissionRepository.update(permission._id, item)];
                    case 2:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                }
            });
        });
    };
    PermissionBusiness.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isDeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._permissionRepository.delete(id)];
                    case 1:
                        isDeleted = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, isDeleted)];
                }
            });
        });
    };
    return PermissionBusiness;
}());
Object.seal(PermissionBusiness);
module.exports = PermissionBusiness;
//# sourceMappingURL=PermissionBusiness.js.map
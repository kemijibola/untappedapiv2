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
var RoleRepository_1 = __importDefault(require("../repository/RoleRepository"));
var Result_1 = require("../../utils/Result");
var RoleBusiness = /** @class */ (function () {
    function RoleBusiness() {
        this._roleRepository = new RoleRepository_1.default();
    }
    RoleBusiness.prototype.fetch = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var refinedRoles, roles, _i, roles_1, role, roleViewModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        condition.global = true;
                        condition.isActive = true;
                        refinedRoles = [];
                        return [4 /*yield*/, this._roleRepository.fetch(condition)];
                    case 1:
                        roles = _a.sent();
                        for (_i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
                            role = roles_1[_i];
                            roleViewModel = {
                                _id: role._id,
                                name: role.name,
                                global: role.global,
                                description: role.description,
                                createdAt: role.createdAt,
                                updatedAt: role.updateAt || new Date()
                            };
                            refinedRoles = refinedRoles.concat([roleViewModel]);
                        }
                        return [2 /*return*/, Result_1.Result.ok(200, refinedRoles)];
                }
            });
        });
    };
    RoleBusiness.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var role;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request")];
                        return [4 /*yield*/, this._roleRepository.findById(id)];
                    case 1:
                        role = _a.sent();
                        if (!role)
                            return [2 /*return*/, Result_1.Result.fail(404, "Role of Id " + id + " not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, role)];
                }
            });
        });
    };
    RoleBusiness.prototype.findOne = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var role;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!condition)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request")];
                        return [4 /*yield*/, this._roleRepository.findByOne(condition)];
                    case 1:
                        role = _a.sent();
                        if (!role)
                            return [2 /*return*/, Result_1.Result.fail(404, "Role not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, role)];
                }
            });
        });
    };
    RoleBusiness.prototype.findByCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var role;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._roleRepository.findByCriteria(criteria)];
                    case 1:
                        role = _a.sent();
                        if (!role)
                            return [2 /*return*/, Result_1.Result.fail(404, "Role not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, role)];
                }
            });
        });
    };
    RoleBusiness.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var role, roleExist, newRole;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._roleRepository.findByCriteria({
                            name: item.name
                        })];
                    case 1:
                        role = _a.sent();
                        if (!(role === null)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._roleRepository.findByCriteria({
                                name: "Free",
                                isDefault: item.isDefault,
                                isActive: true
                            })];
                    case 2:
                        roleExist = _a.sent();
                        if (!(roleExist === null)) return [3 /*break*/, 4];
                        item.isActive = false;
                        return [4 /*yield*/, this._roleRepository.create(item)];
                    case 3:
                        newRole = _a.sent();
                        // TODO:: create approval request here
                        return [2 /*return*/, Result_1.Result.ok(201, newRole)];
                    case 4: return [2 /*return*/, Result_1.Result.fail(400, "A role is currently set as default.")];
                    case 5: return [2 /*return*/, Result_1.Result.fail(400, "Role with name '" + role.name + "' exists")];
                }
            });
        });
    };
    RoleBusiness.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var role, updateObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._roleRepository.findById(id)];
                    case 1:
                        role = _a.sent();
                        if (!role)
                            return [2 /*return*/, Result_1.Result.fail(500, "Could not update role.Role with Id " + id + " not found")];
                        return [4 /*yield*/, this._roleRepository.update(role._id, item)];
                    case 2:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                }
            });
        });
    };
    RoleBusiness.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isDeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._roleRepository.delete(id)];
                    case 1:
                        isDeleted = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, isDeleted)];
                }
            });
        });
    };
    return RoleBusiness;
}());
Object.seal(RoleBusiness);
module.exports = RoleBusiness;
//# sourceMappingURL=RoleBusiness.js.map
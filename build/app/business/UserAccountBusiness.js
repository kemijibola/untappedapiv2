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
var UserAccountRepository_1 = __importDefault(require("../repository/UserAccountRepository"));
var Result_1 = require("../../utils/Result");
var UserAccountBusiness = /** @class */ (function () {
    function UserAccountBusiness() {
        this._userAccountRepository = new UserAccountRepository_1.default();
    }
    UserAccountBusiness.prototype.fetch = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var userAccounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userAccountRepository.fetch(condition)];
                    case 1:
                        userAccounts = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, userAccounts)];
                }
            });
        });
    };
    UserAccountBusiness.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var userAccount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request")];
                        return [4 /*yield*/, this._userAccountRepository.findById(id)];
                    case 1:
                        userAccount = _a.sent();
                        if (!userAccount)
                            return [2 /*return*/, Result_1.Result.fail(404, "UserAccount not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, userAccount)];
                }
            });
        });
    };
    UserAccountBusiness.prototype.findOne = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var userAccount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!condition)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request")];
                        return [4 /*yield*/, this._userAccountRepository.findByOne(condition)];
                    case 1:
                        userAccount = _a.sent();
                        if (!userAccount)
                            return [2 /*return*/, Result_1.Result.fail(404, "UserAccount not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, userAccount)];
                }
            });
        });
    };
    UserAccountBusiness.prototype.findByCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var userAccount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userAccountRepository.findByCriteria(criteria)];
                    case 1:
                        userAccount = _a.sent();
                        if (!userAccount)
                            return [2 /*return*/, Result_1.Result.fail(404, "UserAccount not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, userAccount)];
                }
            });
        });
    };
    UserAccountBusiness.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var userAccount, newUserAccount, updateObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userAccountRepository.findByCriteria({
                            user: item.user,
                        })];
                    case 1:
                        userAccount = _a.sent();
                        if (!(userAccount === null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._userAccountRepository.create(item)];
                    case 2:
                        newUserAccount = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(201, newUserAccount)];
                    case 3:
                        userAccount.gatewayRecipientCode = item.gatewayRecipientCode;
                        userAccount.updateAt = new Date();
                        return [4 /*yield*/, this._userAccountRepository.update(userAccount._id, userAccount)];
                    case 4:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                }
            });
        });
    };
    UserAccountBusiness.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var userAccount, updateObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userAccountRepository.findById(id)];
                    case 1:
                        userAccount = _a.sent();
                        if (!userAccount)
                            return [2 /*return*/, Result_1.Result.fail(404, "UserAccount not found")];
                        return [4 /*yield*/, this._userAccountRepository.update(userAccount._id, item)];
                    case 2:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                }
            });
        });
    };
    UserAccountBusiness.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isDeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userAccountRepository.delete(id)];
                    case 1:
                        isDeleted = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, isDeleted)];
                }
            });
        });
    };
    return UserAccountBusiness;
}());
Object.seal(UserAccountBusiness);
module.exports = UserAccountBusiness;
//# sourceMappingURL=UserAccountBusiness.js.map
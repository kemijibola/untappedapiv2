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
var IssueCategoryRepository_1 = __importDefault(require("../repository/IssueCategoryRepository"));
var Result_1 = require("../../utils/Result");
var IssueCategoryBusiness = /** @class */ (function () {
    function IssueCategoryBusiness() {
        this._issueCategoryRepository = new IssueCategoryRepository_1.default();
    }
    IssueCategoryBusiness.prototype.fetch = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var issueCategories, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._issueCategoryRepository.fetch(condition)];
                    case 1:
                        issueCategories = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, issueCategories)];
                    case 2:
                        err_1 = _a.sent();
                        throw new Error("InternalServer error occured." + err_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    IssueCategoryBusiness.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var issueCategory, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._issueCategoryRepository.findById(id)];
                    case 1:
                        issueCategory = _a.sent();
                        if (!issueCategory)
                            return [2 /*return*/, Result_1.Result.fail(404, "Issue category of Id " + id + " not found")];
                        else
                            return [2 /*return*/, Result_1.Result.ok(200, issueCategory)];
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        throw new Error("InternalServer error occured." + err_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    IssueCategoryBusiness.prototype.findByCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var issueCategory, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._issueCategoryRepository.findByCriteria(criteria)];
                    case 1:
                        issueCategory = _a.sent();
                        if (!issueCategory)
                            return [2 /*return*/, Result_1.Result.fail(404, "Issue category not found")];
                        else
                            return [2 /*return*/, Result_1.Result.ok(200, issueCategory)];
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        throw new Error("InternalServer error occured." + err_3.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    IssueCategoryBusiness.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var newIssueCategory, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._issueCategoryRepository.create(item)];
                    case 1:
                        newIssueCategory = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(201, newIssueCategory)];
                    case 2:
                        err_4 = _a.sent();
                        throw new Error("InternalServer error occured." + err_4.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    IssueCategoryBusiness.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var gig, updateObj, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this._issueCategoryRepository.findById(id)];
                    case 1:
                        gig = _a.sent();
                        if (!gig)
                            return [2 /*return*/, Result_1.Result.fail(404, "Could not update issue category.Issue category with Id " + id + " not found")];
                        return [4 /*yield*/, this._issueCategoryRepository.update(gig._id, item)];
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
    IssueCategoryBusiness.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isDeleted, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._issueCategoryRepository.delete(id)];
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
    return IssueCategoryBusiness;
}());
Object.seal(IssueCategoryBusiness);
module.exports = IssueCategoryBusiness;
//# sourceMappingURL=IssueCategoryBusiness.js.map
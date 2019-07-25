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
var ApplicationRepository_1 = __importDefault(require("../repository/ApplicationRepository"));
var Result_1 = require("../../utils/Result");
var ApplicationBusiness = /** @class */ (function () {
    function ApplicationBusiness() {
        this._applicationRepository = new ApplicationRepository_1.default();
    }
    ApplicationBusiness.prototype.fetch = function (condidtion) {
        return __awaiter(this, void 0, void 0, function () {
            var refinedApplications, applications, _i, applications_1, application, applicationViewModel, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        refinedApplications = [];
                        return [4 /*yield*/, this._applicationRepository.fetch(condidtion)];
                    case 1:
                        applications = _a.sent();
                        for (_i = 0, applications_1 = applications; _i < applications_1.length; _i++) {
                            application = applications_1[_i];
                            applicationViewModel = {
                                _id: application._id,
                                name: application.name,
                                dbUri: application.dbUri,
                                country: application.country,
                                identity: application.identity
                            };
                            refinedApplications = refinedApplications.concat([applicationViewModel]);
                        }
                        return [2 /*return*/, Result_1.Result.ok(200, refinedApplications)];
                    case 2:
                        err_1 = _a.sent();
                        throw new Error("InternalServer error occured." + err_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApplicationBusiness.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var application, refinedApplication, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!id)
                            return [2 /*return*/, Result_1.Result.fail(400, 'Invalid id')];
                        return [4 /*yield*/, this._applicationRepository.findById(id)];
                    case 1:
                        application = _a.sent();
                        if (!application) {
                            return [2 /*return*/, Result_1.Result.fail(404, "Application of Id " + id + " not found")];
                        }
                        else {
                            refinedApplication = {
                                _id: application._id,
                                name: application.name,
                                dbUri: application.dbUri,
                                country: application.country,
                                identity: application.identity
                            };
                            return [2 /*return*/, Result_1.Result.ok(200, refinedApplication)];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        throw new Error("InternalServer error occured." + err_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApplicationBusiness.prototype.findByCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var application, refinedApplication, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        criteria.isActive = true;
                        return [4 /*yield*/, this._applicationRepository.findByCriteria(criteria)];
                    case 1:
                        application = _a.sent();
                        if (!application) {
                            return [2 /*return*/, Result_1.Result.fail(404, "Application not found")];
                        }
                        else {
                            refinedApplication = {
                                _id: application._id,
                                name: application.name,
                                dbUri: application.dbUri,
                                country: application.country,
                                identity: application.identity
                            };
                            return [2 /*return*/, Result_1.Result.ok(200, refinedApplication)];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        throw new Error("InternalServer error occured." + err_3.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApplicationBusiness.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var newApplication, refinedApplication, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._applicationRepository.create(item)];
                    case 1:
                        newApplication = _a.sent();
                        refinedApplication = {
                            _id: newApplication._id,
                            name: newApplication.name,
                            dbUri: newApplication.dbUri,
                            country: newApplication.country,
                            identity: newApplication.identity
                        };
                        return [2 /*return*/, Result_1.Result.ok(201, refinedApplication)];
                    case 2:
                        err_4 = _a.sent();
                        throw new Error("InternalServer error occured." + err_4.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApplicationBusiness.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var application, updateObj, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this._applicationRepository.findById(id)];
                    case 1:
                        application = _a.sent();
                        if (!application)
                            return [2 /*return*/, Result_1.Result.fail(404, "Could not update Application.Application of Id " + id + " not found")];
                        return [4 /*yield*/, this._applicationRepository.update(application._id, item)];
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
    ApplicationBusiness.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isDeleted, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._applicationRepository.delete(id)];
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
    return ApplicationBusiness;
}());
Object.seal(ApplicationBusiness);
module.exports = ApplicationBusiness;
//# sourceMappingURL=ApplicationBusiness.js.map
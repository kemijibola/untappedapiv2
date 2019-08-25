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
var EvaluationRepository_1 = __importDefault(require("../repository/EvaluationRepository"));
var Result_1 = require("../../utils/Result");
var EvaluationBusiness = /** @class */ (function () {
    function EvaluationBusiness() {
        this._evaluationRepository = new EvaluationRepository_1.default();
    }
    EvaluationBusiness.prototype.fetch = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var evaluations, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._evaluationRepository.fetch(condition)];
                    case 1:
                        evaluations = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, evaluations)];
                    case 2:
                        err_1 = _a.sent();
                        throw new Error("InternalServer error occured." + err_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EvaluationBusiness.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var evaluation, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!id)
                            return [2 /*return*/, Result_1.Result.fail(400, 'Bad request.')];
                        return [4 /*yield*/, this._evaluationRepository.findById(id)];
                    case 1:
                        evaluation = _a.sent();
                        if (!evaluation)
                            return [2 /*return*/, Result_1.Result.fail(404, "Evaluation of Id " + id + " not found")];
                        else
                            return [2 /*return*/, Result_1.Result.ok(200, evaluation)];
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        throw new Error("InternalServer error occured." + err_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EvaluationBusiness.prototype.findOne = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var evaluation, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!condition)
                            return [2 /*return*/, Result_1.Result.fail(400, 'Bad request.')];
                        return [4 /*yield*/, this._evaluationRepository.findByOne(condition)];
                    case 1:
                        evaluation = _a.sent();
                        if (!evaluation)
                            return [2 /*return*/, Result_1.Result.fail(404, "Evaluation not found")];
                        else
                            return [2 /*return*/, Result_1.Result.ok(200, evaluation)];
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        throw new Error("InternalServer error occured." + err_3.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EvaluationBusiness.prototype.findByCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var evaluation, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._evaluationRepository.findByCriteria(criteria)];
                    case 1:
                        evaluation = _a.sent();
                        if (!evaluation)
                            return [2 /*return*/, Result_1.Result.fail(404, "Evaluation not found")];
                        else
                            return [2 /*return*/, Result_1.Result.ok(200, evaluation)];
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        throw new Error("InternalServer error occured." + err_4.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EvaluationBusiness.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var newEvaluation, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._evaluationRepository.create(item)];
                    case 1:
                        newEvaluation = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(201, newEvaluation)];
                    case 2:
                        err_5 = _a.sent();
                        throw new Error("InternalServer error occured." + err_5.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EvaluationBusiness.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var evaluation, updateObj, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this._evaluationRepository.findById(id)];
                    case 1:
                        evaluation = _a.sent();
                        if (!evaluation)
                            return [2 /*return*/, Result_1.Result.fail(404, "Could not update evaluation.Evaluation of Id " + id + " not found")];
                        return [4 /*yield*/, this._evaluationRepository.update(evaluation._id, item)];
                    case 2:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("InternalServer error occured." + err_6.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EvaluationBusiness.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isDeleted, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._evaluationRepository.delete(id)];
                    case 1:
                        isDeleted = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, isDeleted)];
                    case 2:
                        err_7 = _a.sent();
                        throw new Error("InternalServer error occured." + err_7.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return EvaluationBusiness;
}());
Object.seal(EvaluationBusiness);
module.exports = EvaluationBusiness;
//# sourceMappingURL=EvaluationBusiness.js.map
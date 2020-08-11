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
var TransactionRequestRepository_1 = __importDefault(require("../repository/TransactionRequestRepository"));
var UserAccountRepository_1 = __importDefault(require("../repository/UserAccountRepository"));
var Result_1 = require("../../utils/Result");
var date_fns_1 = require("date-fns");
var TransactionRequestBusiness = /** @class */ (function () {
    function TransactionRequestBusiness() {
        this._transactionRequestRepository = new TransactionRequestRepository_1.default();
        this._userAccountRepository = new UserAccountRepository_1.default();
    }
    TransactionRequestBusiness.prototype.fetch = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var transationRequests;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._transactionRequestRepository.fetch(condition)];
                    case 1:
                        transationRequests = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, transationRequests)];
                }
            });
        });
    };
    TransactionRequestBusiness.prototype.fetchTransactions = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var transationRequests;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._transactionRequestRepository.fetchTransactionsOrderedByDate(condition)];
                    case 1:
                        transationRequests = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, transationRequests)];
                }
            });
        });
    };
    TransactionRequestBusiness.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request")];
                        return [4 /*yield*/, this._transactionRequestRepository.findById(id)];
                    case 1:
                        transactionRequest = _a.sent();
                        if (!transactionRequest)
                            return [2 /*return*/, Result_1.Result.fail(404, "TransactionRequest Id not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, transactionRequest)];
                }
            });
        });
    };
    TransactionRequestBusiness.prototype.findOne = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!condition)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request")];
                        return [4 /*yield*/, this._transactionRequestRepository.findByOne(condition)];
                    case 1:
                        transactionRequest = _a.sent();
                        if (!transactionRequest)
                            return [2 /*return*/, Result_1.Result.fail(404, "TransactionRequest not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, transactionRequest)];
                }
            });
        });
    };
    TransactionRequestBusiness.prototype.findByCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._transactionRequestRepository.findByCriteria(criteria)];
                    case 1:
                        transactionRequest = _a.sent();
                        if (!transactionRequest)
                            return [2 /*return*/, Result_1.Result.fail(404, "TransactionRequest not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, transactionRequest)];
                }
            });
        });
    };
    TransactionRequestBusiness.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var newTransactionRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._transactionRequestRepository.create(item)];
                    case 1:
                        newTransactionRequest = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(201, newTransactionRequest)];
                }
            });
        });
    };
    TransactionRequestBusiness.prototype.updateTransactionStatus = function (transferCode, recipientCode, amount, status, responseMessge, responseCode, responseBody, transferredAt) {
        if (transferredAt === void 0) { transferredAt = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var recipient, transaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userAccountRepository.findByCriteria({
                            gatewayRecipientCode: recipientCode,
                        })];
                    case 1:
                        recipient = _a.sent();
                        if (!recipient) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._transactionRequestRepository.findByCriteria({ transferCode: transferCode, user: recipient.user })];
                    case 2:
                        transaction = _a.sent();
                        if (!(transaction.amount === amount)) return [3 /*break*/, 4];
                        transaction.transactionStatus = status;
                        transaction.transactionDate =
                            date_fns_1.parse(transferredAt) || transaction.transactionDate;
                        transaction.responseMessage = responseMessge;
                        transaction.responseBody = responseBody;
                        transaction.responseCode = responseCode;
                        return [4 /*yield*/, this._transactionRequestRepository.update(transaction._id, transaction)];
                    case 3:
                        _a.sent();
                        console.log(transaction);
                        transaction.save();
                        return [2 /*return*/, true];
                    case 4: return [2 /*return*/, false];
                }
            });
        });
    };
    TransactionRequestBusiness.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionRequest, updateObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._transactionRequestRepository.findById(id)];
                    case 1:
                        transactionRequest = _a.sent();
                        if (!transactionRequest)
                            return [2 /*return*/, Result_1.Result.fail(404, "Could not update TransactionRequest.TransactionRequest not found")];
                        return [4 /*yield*/, this._transactionRequestRepository.update(transactionRequest._id, item)];
                    case 2:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                }
            });
        });
    };
    TransactionRequestBusiness.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isDeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._transactionRequestRepository.delete(id)];
                    case 1:
                        isDeleted = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, isDeleted)];
                }
            });
        });
    };
    return TransactionRequestBusiness;
}());
Object.seal(TransactionRequestBusiness);
module.exports = TransactionRequestBusiness;
//# sourceMappingURL=TransactionRequestBusiness.js.map
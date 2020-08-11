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
var TransactionDTO_1 = require("./../models/interfaces/custom/TransactionDTO");
var WalletDataRepository_1 = __importDefault(require("../repository/WalletDataRepository"));
var UserRepository_1 = __importDefault(require("../repository/UserRepository"));
var UserAccountRepository_1 = __importDefault(require("../repository/UserAccountRepository"));
var TransactionRequestRepository_1 = __importDefault(require("../repository/TransactionRequestRepository"));
var Result_1 = require("../../utils/Result");
var Helper_1 = require("../../utils/lib/Helper");
var TransactionDTO_2 = require("../models/interfaces/custom/TransactionDTO");
var PaymentFactory_1 = require("../../utils/payments/PaymentFactory");
var date_fns_1 = require("date-fns");
var config = module.require("../../config/keys");
var WalletBusiness = /** @class */ (function () {
    function WalletBusiness() {
        this._walletDataRepository = new WalletDataRepository_1.default();
        this._userRepository = new UserRepository_1.default();
        this._userAccountRepository = new UserAccountRepository_1.default();
        this._transactionRequestRepository = new TransactionRequestRepository_1.default();
    }
    WalletBusiness.prototype.fetch = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var walletData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._walletDataRepository.fetch(condition)];
                    case 1:
                        walletData = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, walletData)];
                }
            });
        });
    };
    WalletBusiness.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var walletData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request")];
                        return [4 /*yield*/, this._walletDataRepository.findById(id)];
                    case 1:
                        walletData = _a.sent();
                        if (!walletData)
                            return [2 /*return*/, Result_1.Result.fail(404, "WalletData Id not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, walletData)];
                }
            });
        });
    };
    WalletBusiness.prototype.findOne = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var walletData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!condition)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request")];
                        return [4 /*yield*/, this._walletDataRepository.findByOne(condition)];
                    case 1:
                        walletData = _a.sent();
                        if (!walletData)
                            return [2 /*return*/, Result_1.Result.fail(404, "WalletData not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, walletData)];
                }
            });
        });
    };
    WalletBusiness.prototype.findByCriteriaFirstOrDefault = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var userWalletData, walletData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userWalletData = null;
                        return [4 /*yield*/, this._walletDataRepository.fetchFirstOrDefaultWithUser(criteria)];
                    case 1:
                        walletData = _a.sent();
                        if (walletData) {
                            userWalletData = {
                                _id: walletData._id,
                                user: {
                                    _id: walletData.user._id,
                                    name: walletData.user.fullName,
                                },
                                walletNmber: walletData.walletNumber,
                                status: walletData.status,
                                balance: walletData.balance,
                            };
                        }
                        return [2 /*return*/, Result_1.Result.ok(200, userWalletData)];
                }
            });
        });
    };
    WalletBusiness.prototype.findByCriteriaDetails = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var walletData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._walletDataRepository.fetchWithUserDetails(criteria)];
                    case 1:
                        walletData = _a.sent();
                        if (!walletData)
                            return [2 /*return*/, Result_1.Result.fail(404, "WalletData not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, walletData)];
                }
            });
        });
    };
    WalletBusiness.prototype.findByCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var walletData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._walletDataRepository.findByCriteria(criteria)];
                    case 1:
                        walletData = _a.sent();
                        if (!walletData)
                            return [2 /*return*/, Result_1.Result.fail(404, "WalletData not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, walletData)];
                }
            });
        });
    };
    WalletBusiness.prototype.transferFromWallet = function (processor, pin, amount, user, narration) {
        return __awaiter(this, void 0, void 0, function () {
            var userWallet, walletPin, decrypted, walletBalance, walletBalanceInKobo, userAccount, recipientCode, paymentFactory, result, walletBalance_1, newWalletBalance, transactionObj, transactionObj, err_1, transactionObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._walletDataRepository.findByCriteria({ user: user })];
                    case 1:
                        userWallet = _a.sent();
                        if (!userWallet)
                            return [2 /*return*/, Result_1.Result.fail(404, "User wallet not found")];
                        if (userWallet.status === TransactionDTO_2.PaymentProviderStatus.deactivated)
                            return [2 /*return*/, Result_1.Result.fail(400, "User wallet not activated")];
                        walletPin = Helper_1.decrypt(config.KEY, userWallet.pin);
                        decrypted = Helper_1.decrypt(config.KEY, pin);
                        if (walletPin !== decrypted)
                            return [2 /*return*/, Result_1.Result.fail(400, "Incorrect wallet pin")];
                        walletBalance = userWallet.balance;
                        walletBalanceInKobo = walletBalance * 100;
                        if (walletBalanceInKobo < amount)
                            return [2 /*return*/, Result_1.Result.fail(400, "Insufficient wallet balance")];
                        return [4 /*yield*/, this._userAccountRepository.findByCriteria({
                                user: userWallet.user,
                            })];
                    case 2:
                        userAccount = _a.sent();
                        if (!userAccount)
                            return [2 /*return*/, Result_1.Result.fail(404, "User account not found. Please setup account before proceeding.")];
                        recipientCode = userAccount.gatewayRecipientCode || "";
                        paymentFactory = new PaymentFactory_1.PaymentFactory().create(processor.toLowerCase());
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 10, , 12]);
                        return [4 /*yield*/, paymentFactory.transferFund("balance", amount, recipientCode, narration || "Wallet transfer on " + new Date())];
                    case 4:
                        result = _a.sent();
                        if (!result.status) return [3 /*break*/, 7];
                        walletBalance_1 = userWallet.balance;
                        newWalletBalance = walletBalance_1 - amount / 100;
                        userWallet.balance = newWalletBalance;
                        return [4 /*yield*/, userWallet.save()];
                    case 5:
                        _a.sent();
                        transactionObj = Object.assign({
                            user: userWallet.user,
                            amount: result.data.amount / 100,
                            paymentReference: Helper_1.generateRandomNumber(12),
                            externalReference: result.data.reference,
                            narration: result.data.reason,
                            paymentChannel: "paystack",
                            transactionType: TransactionDTO_1.TransctionType.debit,
                            transferCode: result.data.transfer_code,
                            responseCode: 200,
                            responseMessage: result.message,
                            currency: result.data.currency,
                            transactionDate: date_fns_1.parse(result.data.createdAt),
                            transactionStatus: result.data.status,
                        });
                        return [4 /*yield*/, this._transactionRequestRepository.create(transactionObj)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(201, userWallet)];
                    case 7:
                        transactionObj = Object.assign({
                            user: userWallet.user,
                            amount: result.data.amount / 100 || amount,
                            externalReference: result.data.reference || "",
                            narration: result.data.reason || "",
                            paymentChannel: "paystack",
                            transactionType: TransactionDTO_1.TransctionType.debit,
                            transferCode: result.data.transfer_code || "",
                            responseCode: 400,
                            responseMessage: result.message,
                            currency: result.data.currency,
                            transactionDate: date_fns_1.parse(result.data.createdAt),
                            transactionStatus: result.data.status || "",
                        });
                        return [4 /*yield*/, this._transactionRequestRepository.create(transactionObj)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, Result_1.Result.fail(400, result.message)];
                    case 9: return [3 /*break*/, 12];
                    case 10:
                        err_1 = _a.sent();
                        transactionObj = Object.assign({
                            user: userWallet.user,
                            amount: amount / 100,
                            externalReference: "",
                            narration: narration,
                            paymentChannel: "paystack",
                            transactionType: TransactionDTO_1.TransctionType.debit,
                            transferCode: "",
                            responseCode: err_1.statusCode,
                            responseMessage: err_1.error.message,
                            currency: "NGN",
                            transactionDate: new Date(),
                            transactionStatus: "failed",
                        });
                        return [4 /*yield*/, this._transactionRequestRepository.create(transactionObj)];
                    case 11:
                        _a.sent();
                        return [2 /*return*/, Result_1.Result.fail(400, "We are unable to process your request at this time.")];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    WalletBusiness.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var walletData, newWalletData, walletOwner, walletInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._walletDataRepository.findByCriteria({
                            user: item.user,
                        })];
                    case 1:
                        walletData = _a.sent();
                        if (walletData)
                            return [2 /*return*/, Result_1.Result.fail(409, "User wallet exist")];
                        item.walletNumber = Helper_1.generateRandomNumber(9);
                        item.status = TransactionDTO_2.PaymentProviderStatus.activated;
                        item.balance = 0;
                        return [4 /*yield*/, this._walletDataRepository.create(item)];
                    case 2:
                        newWalletData = _a.sent();
                        return [4 /*yield*/, this._userRepository.findById(newWalletData.user)];
                    case 3:
                        walletOwner = _a.sent();
                        walletInfo = {
                            _id: newWalletData._id,
                            user: {
                                _id: newWalletData.user._id,
                                name: walletOwner.fullName,
                            },
                            walletNmber: newWalletData.walletNumber,
                            status: newWalletData.status,
                            balance: newWalletData.balance,
                        };
                        return [2 /*return*/, Result_1.Result.ok(201, walletInfo)];
                }
            });
        });
    };
    WalletBusiness.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionRequest, updateObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._walletDataRepository.findById(id)];
                    case 1:
                        transactionRequest = _a.sent();
                        if (!transactionRequest)
                            return [2 /*return*/, Result_1.Result.fail(404, "Could not update Wallet Data.Wallet Data not found")];
                        return [4 /*yield*/, this._walletDataRepository.update(transactionRequest._id, item)];
                    case 2:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                }
            });
        });
    };
    WalletBusiness.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isDeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._walletDataRepository.delete(id)];
                    case 1:
                        isDeleted = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, isDeleted)];
                }
            });
        });
    };
    return WalletBusiness;
}());
Object.seal(WalletBusiness);
module.exports = WalletBusiness;
//# sourceMappingURL=WalletDataBusiness.js.map
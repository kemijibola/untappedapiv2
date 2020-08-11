"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationError_1 = require("../utils/error/ApplicationError");
var decorators_1 = require("../decorators");
var UserAccountBusiness = require("../app/business/UserAccountBusiness");
var TransactionRequestBusiness = require("../app/business/TransactionRequestBusiness");
var ValidateRequest_1 = require("../middlewares/ValidateRequest");
var auth_1 = require("../middlewares/auth");
var PaymentFactory_1 = require("../utils/payments/PaymentFactory");
var payer_1 = require("../utils/payments/payer");
var Helper_1 = require("../utils/lib/Helper");
var config = require("../config/keys");
var TransactionController = /** @class */ (function () {
    function TransactionController() {
    }
    TransactionController.prototype.fetchBanks = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var paymentFactory, result, err_1, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!req.body.processor) {
                            return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                                    code: 400,
                                    message: "Please provide processor",
                                }))];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        paymentFactory = new PaymentFactory_1.PaymentFactory().create(req.body.processor.toLowerCase());
                        return [4 /*yield*/, paymentFactory.fetchBanks()];
                    case 2:
                        result = _a.sent();
                        if (result.status) {
                            return [2 /*return*/, res.status(200).json({
                                    message: result.message,
                                    data: result.data,
                                })];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                                code: 400,
                                message: err_1.error.message,
                            }))];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TransactionController.prototype.resolveAccountNumber = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var paymentFactory, result, userAccountBusiness, userAccountObj, transferRecipient, userAccountObj_1, userAccount, err_3, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        if (!req.body.processor) {
                            return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                                    code: 400,
                                    message: "Please provide processor",
                                }))];
                        }
                        if (!req.body.accountNumber) {
                            return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                                    code: 400,
                                    message: "Please provide accountNumber",
                                }))];
                        }
                        if (!req.body.bankCode) {
                            return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                                    code: 400,
                                    message: "Please provide bankCode",
                                }))];
                        }
                        paymentFactory = new PaymentFactory_1.PaymentFactory().create(req.body.processor.toLowerCase());
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, paymentFactory.verifyAccountNmber(req.body.accountNumber, req.body.bankCode)];
                    case 2:
                        result = _a.sent();
                        if (!result.status) return [3 /*break*/, 6];
                        userAccountBusiness = new UserAccountBusiness();
                        userAccountObj = Object.assign({
                            user: req.user,
                            accountNumber: result.data.account_number,
                            accountName: result.data.account_name,
                            bankId: result.data.bank_id,
                        });
                        if (!(req.body.processor === payer_1.PaymentGatewayType.paystack)) return [3 /*break*/, 6];
                        return [4 /*yield*/, paymentFactory.createTransferRecipient("nuban", userAccountObj.accountName, userAccountObj.accountNumber, req.body.bankCode)];
                    case 3:
                        transferRecipient = _a.sent();
                        if (!transferRecipient.status) return [3 /*break*/, 5];
                        userAccountObj_1 = Object.assign({
                            user: req.user,
                            accountNumber: result.data.account_number,
                            bankName: transferRecipient.data.details.bank_name,
                            accountName: result.data.account_name,
                            bankId: result.data.bank_id,
                            gatewayRecipientCode: transferRecipient.data.recipient_code,
                            currency: transferRecipient.data.currency,
                            bankCode: transferRecipient.data.details.bank_code,
                        });
                        if (!transferRecipient.data.active ||
                            transferRecipient.data.is_deleted) {
                            return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                                    code: 400,
                                    message: "Your account is inactive. Please reach out to your bank",
                                }))];
                        }
                        return [4 /*yield*/, userAccountBusiness.create(userAccountObj_1)];
                    case 4:
                        userAccount = _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                message: "User account created successfully",
                                data: userAccount.data,
                            })];
                    case 5: return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                            code: 400,
                            message: transferRecipient.message,
                        }))];
                    case 6: return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                            code: 400,
                            message: result.message,
                        }))];
                    case 7:
                        err_3 = _a.sent();
                        return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                                code: 400,
                                message: err_3.error.message,
                            }))];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        err_4 = _a.sent();
                        return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    TransactionController.prototype.updateTransaction = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, response, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        console.log("update request gotten", 1);
                        hash = Helper_1.signatureHash(config.PAYMENT_SECRETS.paystack_secret, JSON.stringify(req.body));
                        if (!(hash === req.headers["x-paystack-signature"])) return [3 /*break*/, 5];
                        response = req.body;
                        console.log(response.event);
                        console.log(response.data);
                        if (!(response.event === "transfer.success")) return [3 /*break*/, 2];
                        console.log("got here");
                        return [4 /*yield*/, this.sendTransactionSuccess(response.data.transfer_code, response.data.recipient.recipient_code, response.data.amount, response.data.status, "Transaction successful", 200, JSON.stringify(response.data), response.data.transferred_at)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(response.event === "transfer.failed")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.sendTransactionFailed(response.data.transfer_code, response.data.recipient.recipient_code, response.data.amount, response.data.status, "Transaction failed", 400, JSON.stringify(response.data))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        res.send(200);
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_5 = _a.sent();
                        return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    TransactionController.prototype.sendTransactionFailed = function (transferCode, recipientCode, amount, status, responseMessge, responseCode, responseBody) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionRequestBusiness, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        transactionRequestBusiness = new TransactionRequestBusiness();
                        return [4 /*yield*/, transactionRequestBusiness.updateTransactionStatus(transferCode, recipientCode, amount, status, responseMessge, responseCode, responseBody)];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        console.log(err_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TransactionController.prototype.sendTransactionSuccess = function (transferCode, recipientCode, amount, status, responseMessge, responseCode, responseBody, transferredAt) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionRequestBusiness, result, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("line 291");
                        transactionRequestBusiness = new TransactionRequestBusiness();
                        return [4 /*yield*/, transactionRequestBusiness.updateTransactionStatus(transferCode, recipientCode, amount, status, responseMessge, responseCode, responseBody)];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_7 = _a.sent();
                        console.log(err_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        decorators_1.post("/banks"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.requestValidators("processor"),
        decorators_1.use(auth_1.requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], TransactionController.prototype, "fetchBanks", null);
    __decorate([
        decorators_1.post("/bank/resolve"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.requestValidators("processor", "accountNumber", "bankCode"),
        decorators_1.use(auth_1.requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], TransactionController.prototype, "resolveAccountNumber", null);
    __decorate([
        decorators_1.post("/webhook/transfer/update"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], TransactionController.prototype, "updateTransaction", null);
    TransactionController = __decorate([
        decorators_1.controller("/v1/transactions"),
        __metadata("design:paramtypes", [])
    ], TransactionController);
    return TransactionController;
}());
exports.TransactionController = TransactionController;
//# sourceMappingURL=TransactionController.js.map
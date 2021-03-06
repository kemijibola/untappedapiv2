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
var decorators_1 = require("../decorators");
var error_1 = require("../utils/error");
var WalletBusiness = require("../app/business/WalletDataBusiness");
var TransactionRequestBusiness = require("../app/business/TransactionRequestBusiness");
var PermissionConstant_1 = require("../utils/lib/PermissionConstant");
var ValidateRequest_1 = require("../middlewares/ValidateRequest");
var auth_1 = require("../middlewares/auth");
var TransactionDTO_1 = require("../app/models/interfaces/custom/TransactionDTO");
var lib_1 = require("../utils/lib");
var WalletController = /** @class */ (function () {
    function WalletController() {
    }
    WalletController.prototype.fetchWalletBalance = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var walletBusiness, condition, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        walletBusiness = new WalletBusiness();
                        condition = {
                            user: req.user,
                            status: TransactionDTO_1.PaymentProviderStatus.activated,
                        };
                        return [4 /*yield*/, walletBusiness.findByCriteriaFirstOrDefault(condition)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        }
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WalletController.prototype.postCreate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var item, walletBusiness, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        item = req.body;
                        walletBusiness = new WalletBusiness();
                        item.user = req.user;
                        return [4 /*yield*/, walletBusiness.create(item)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        }
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WalletController.prototype.transfer = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var amount, amountValue, amountInKobo, walletBusiness, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!req.body.processor) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide processor",
                                }))];
                        }
                        if (!req.body.walletPin) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide walletPin",
                                }))];
                        }
                        if (!req.body.amount) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide amount",
                                }))];
                        }
                        amount = req.body.amount;
                        amountValue = 0;
                        if (!isNaN(Number(amount))) {
                            amountValue = Number(amount);
                        }
                        else {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide valid amount",
                                }))];
                        }
                        if (amountValue < 500) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Amount to withdraw must be greater than 500",
                                }))];
                        }
                        amountInKobo = amountValue * 100;
                        walletBusiness = new WalletBusiness();
                        return [4 /*yield*/, walletBusiness.transferFromWallet(req.body.processor, req.body.walletPin, amountInKobo, req.user, req.body.narration)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        }
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_3 = _a.sent();
                        console.log(err_3);
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WalletController.prototype.fetchUserTransactions = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionRequestBusiness, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        transactionRequestBusiness = new TransactionRequestBusiness();
                        return [4 /*yield*/, transactionRequestBusiness.fetchTransactions({
                                user: req.user,
                                transactionStatus: "success",
                            })];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        }
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_4 = _a.sent();
                        console.log(err_4);
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WalletController.prototype.fetchSecure = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
                try {
                    key = lib_1.walletKey();
                    if (!key) {
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 404,
                                message: "Secure key not found",
                            }))];
                    }
                    return [2 /*return*/, res.status(200).json({
                            message: "Operation successful",
                            data: key,
                        })];
                }
                catch (err) {
                    return [2 /*return*/, next(new error_1.PlatformError({
                            code: 500,
                            message: "Internal Server error occured. Please try again later.",
                        }))];
                }
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        decorators_1.get("/details"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        decorators_1.authorize(PermissionConstant_1.canViewWallet),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], WalletController.prototype, "fetchWalletBalance", null);
    __decorate([
        decorators_1.post("/"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        decorators_1.authorize(PermissionConstant_1.canCreateWallet),
        decorators_1.requestValidators("pin"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], WalletController.prototype, "postCreate", null);
    __decorate([
        decorators_1.post("/transfer"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.requestValidators("processor", "walletPin", "amount"),
        decorators_1.use(auth_1.requireAuth),
        decorators_1.authorize(PermissionConstant_1.canCreateWallet),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], WalletController.prototype, "transfer", null);
    __decorate([
        decorators_1.get("/transactions"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        decorators_1.authorize(PermissionConstant_1.canViewWallet),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], WalletController.prototype, "fetchUserTransactions", null);
    __decorate([
        decorators_1.get("/secure"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        decorators_1.authorize(PermissionConstant_1.canCreateWallet),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], WalletController.prototype, "fetchSecure", null);
    WalletController = __decorate([
        decorators_1.controller("/v1/wallets")
    ], WalletController);
    return WalletController;
}());
exports.WalletController = WalletController;
//# sourceMappingURL=WalletController.js.map
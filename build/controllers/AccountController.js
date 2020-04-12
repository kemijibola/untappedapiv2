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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("../decorators");
var UserBusiness_1 = __importDefault(require("../app/business/UserBusiness"));
var RefreshTokenBusiness_1 = __importDefault(require("../app/business/RefreshTokenBusiness"));
var error_1 = require("../utils/error");
var auth_1 = require("../middlewares/auth");
var ValidateRequest_1 = require("../middlewares/ValidateRequest");
var date_fns_1 = require("date-fns");
// export const kemi = ['email', 'password'];
// function logger(req: Request, res: Response, next: NextFunction) {
//   console.log('Request was made');
//   next();
// }
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.postRefreshToken = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshTokenBusiness, refreshToken, rfTGeneratedDate, userBusiness, audience, refreshTokenData, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        refreshTokenBusiness = new RefreshTokenBusiness_1.default();
                        return [4 /*yield*/, refreshTokenBusiness.findByCriteria({
                                token: req.body.refreshToken,
                            })];
                    case 1:
                        refreshToken = _a.sent();
                        if (refreshToken.error)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: refreshToken.responseCode,
                                    message: refreshToken.error,
                                }))];
                        if (!refreshToken.data) return [3 /*break*/, 3];
                        if (refreshToken.data.isExpired)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 401,
                                    message: "Refresh token is invalid.",
                                }))];
                        if (refreshToken.data.ownerId !== req.body.userId)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 403,
                                    message: "You are not authorized to make this request.",
                                }))];
                        rfTGeneratedDate = date_fns_1.addSeconds(refreshToken.data.createdAt, req.appUser ? req.appUser.refreshTokenExpiresIn : 0);
                        if (date_fns_1.isPast(rfTGeneratedDate)) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 401,
                                    message: "Refresh token has expired. Please generate another token.",
                                }))];
                        }
                        userBusiness = new UserBusiness_1.default();
                        audience = req.appUser ? req.appUser.audience : "";
                        refreshTokenData = {
                            application: req.appUser ? req.appUser.clientId : "",
                        };
                        return [4 /*yield*/, userBusiness.refreshToken(req.body.userId, audience, refreshTokenData)];
                    case 2:
                        result = _a.sent();
                        if (result.error)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data,
                            })];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.postLogin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var audience, loginParams, refreshTokenData, userBusiness, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        audience = req.appUser ? req.appUser.audience.toLowerCase() : "";
                        loginParams = {
                            email: req.body.email.toLowerCase(),
                            password: req.body.password,
                            audience: audience,
                            issuer: "",
                        };
                        refreshTokenData = {
                            application: req.appUser ? req.appUser._id : "",
                        };
                        userBusiness = new UserBusiness_1.default();
                        return [4 /*yield*/, userBusiness.login(loginParams, refreshTokenData)];
                    case 1:
                        result = _a.sent();
                        if (result.error)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_2 = _a.sent();
                        console.log(err_2.message);
                        // log err.message to a logger with name of action
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.postResetPassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userBusiness, item, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userBusiness = new UserBusiness_1.default();
                        item = {
                            email: req.body.email.toLowerCase(),
                            newPassword: req.body.newPassword,
                        };
                        return [4 /*yield*/, userBusiness.resetPassword(item)];
                    case 1:
                        result = _a.sent();
                        if (result.error)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.postVerifyResetPassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userBusiness, audience, item, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userBusiness = new UserBusiness_1.default();
                        audience = req.appUser ? req.appUser.audience.toLowerCase() : "";
                        item = {
                            email: req.body.email.toLowerCase(),
                            token: req.body.token,
                            audience: audience,
                        };
                        return [4 /*yield*/, userBusiness.verifyPasswordResetLink(item)];
                    case 1:
                        result = _a.sent();
                        if (result.error)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_4 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.postforgotPassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var audience, redirectBaseUrl, userBusiness, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        audience = req.appUser ? req.appUser.audience.toLowerCase() : "";
                        redirectBaseUrl = req.appUser
                            ? req.appUser.redirectBaseUrl.toLowerCase()
                            : "";
                        userBusiness = new UserBusiness_1.default();
                        return [4 /*yield*/, userBusiness.forgotPassword(req.body.email.toLowerCase(), audience, redirectBaseUrl)];
                    case 1:
                        result = _a.sent();
                        if (result.error)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_5 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.postChangePassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userBusiness, data, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userBusiness = new UserBusiness_1.default();
                        data = {
                            userId: req.user,
                            oldPassword: req.body.oldPassword,
                            newPassword: req.body.newPassword,
                        };
                        return [4 /*yield*/, userBusiness.changePassword(data)];
                    case 1:
                        result = _a.sent();
                        if (result.error)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_6 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.postResendVerificationLink = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userBusiness, audience, redirectConfirmation, result, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userBusiness = new UserBusiness_1.default();
                        audience = req.appUser ? req.appUser.audience.toLowerCase() : "";
                        redirectConfirmation = req.appUser
                            ? req.appUser.emailConfirmationRedirectUrl.toLowerCase()
                            : "";
                        return [4 /*yield*/, userBusiness.resendVerificationLink(req.body.email.toLowerCase(), audience, redirectConfirmation)];
                    case 1:
                        result = _a.sent();
                        if (result.error)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_7 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.postVerifyEmail = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var audience, request, userBusiness, result, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        audience = req.appUser ? req.appUser.audience.toLowerCase() : "";
                        request = {
                            userEmail: req.body.email.toLowerCase(),
                            token: req.body.token,
                            audience: audience,
                        };
                        userBusiness = new UserBusiness_1.default();
                        return [4 /*yield*/, userBusiness.confirmEmail(request)];
                    case 1:
                        result = _a.sent();
                        if (result.error)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_8 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.postSignup = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var audience, redirectConfirmation, signUpParams, userBusiness, result, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        audience = req.appUser ? req.appUser.audience.toLowerCase() : "";
                        redirectConfirmation = req.appUser
                            ? req.appUser.emailConfirmationRedirectUrl.toLowerCase()
                            : "";
                        signUpParams = {
                            fullName: req.body.fullName,
                            email: req.body.email,
                            password: req.body.password,
                            userType: req.body.userType,
                            audience: audience,
                            confirmationUrl: redirectConfirmation,
                            roles: [],
                        };
                        userBusiness = new UserBusiness_1.default();
                        return [4 /*yield*/, userBusiness.register(signUpParams)];
                    case 1:
                        result = _a.sent();
                        if (result.error)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_9 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        decorators_1.post("/refresh-token"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.requestValidators("refreshToken", "userId"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "postRefreshToken", null);
    __decorate([
        decorators_1.post("/authentication"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.requestValidators("email", "password"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "postLogin", null);
    __decorate([
        decorators_1.post("/account/password/reset"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.requestValidators("email", "newPassword"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "postResetPassword", null);
    __decorate([
        decorators_1.post("/account/password/reset/verify"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.requestValidators("email", "token"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "postVerifyResetPassword", null);
    __decorate([
        decorators_1.post("/account/password/reset/request"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.requestValidators("email"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "postforgotPassword", null);
    __decorate([
        decorators_1.post("/account/password/change"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        decorators_1.requestValidators("oldPassword", "newPassword"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "postChangePassword", null);
    __decorate([
        decorators_1.post("/account/resend-link"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.requestValidators("email"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "postResendVerificationLink", null);
    __decorate([
        decorators_1.post("/account/verify"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.requestValidators("email", "token"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "postVerifyEmail", null);
    __decorate([
        decorators_1.post("/account/signup"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.requestValidators("email", "password", "fullName", "userType"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "postSignup", null);
    AuthController = __decorate([
        decorators_1.controller("/v1")
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=AccountController.js.map
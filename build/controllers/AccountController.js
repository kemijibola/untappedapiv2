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
var error_1 = require("../utils/error");
// export const kemi = ['email', 'password'];
// function logger(req: Request, res: Response, next: NextFunction) {
//   console.log('Request was made');
//   next();
// }
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.postLogin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var loginParams, userBusiness, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        loginParams = {
                            email: req.body.email,
                            password: req.body.password,
                            audience: req.body.audience,
                            issuer: ""
                        };
                        userBusiness = new UserBusiness_1.default();
                        return [4 /*yield*/, userBusiness.login(loginParams)];
                    case 1:
                        result = _a.sent();
                        if (result.error)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error
                                }))];
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data
                            })];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        // console.log(err.message);
                        // log err.message to a logger with name of action
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later."
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.postforgotPassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userBusiness, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userBusiness = new UserBusiness_1.default();
                        return [4 /*yield*/, userBusiness.forgotPassword(req.body.email.toLowerCase(), req.body.audience.toLowerCase(), req.body.confirmationUrl.toLowerCase())];
                    case 1:
                        result = _a.sent();
                        if (result.error)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error
                                }))];
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data
                            })];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later."
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.postChangePassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userBusiness, data, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userBusiness = new UserBusiness_1.default();
                        data = {
                            userId: "5db803b9fd13673bd81547e4",
                            oldPassword: req.body.oldPassword,
                            newPassword: req.body.newPassword
                        };
                        return [4 /*yield*/, userBusiness.resetPassword(data)];
                    case 1:
                        result = _a.sent();
                        if (result.error)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error
                                }))];
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data
                            })];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later."
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.postResendVerificationLink = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userBusiness, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userBusiness = new UserBusiness_1.default();
                        return [4 /*yield*/, userBusiness.resendVerificationLink(req.body.email.toLowerCase(), req.body.audience.toLowerCase(), req.body.confirmationUrl.toLowerCase())];
                    case 1:
                        result = _a.sent();
                        if (result.error)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error
                                }))];
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data
                            })];
                    case 2:
                        err_4 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later."
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.postVerifyEmail = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var request, userBusiness, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        request = {
                            userEmail: req.body.email,
                            token: req.body.token,
                            audience: req.body.audience
                        };
                        userBusiness = new UserBusiness_1.default();
                        return [4 /*yield*/, userBusiness.confirmEmail(request)];
                    case 1:
                        result = _a.sent();
                        if (result.error)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error
                                }))];
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data
                            })];
                    case 2:
                        err_5 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later."
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.postSignup = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var signUpParams, userBusiness, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("got here");
                        signUpParams = {
                            fullName: req.body.fullName,
                            email: req.body.email,
                            password: req.body.password,
                            userType: req.body.userType,
                            audience: req.body.audience,
                            confirmationUrl: req.body.confirmationUrl,
                            roles: []
                        };
                        userBusiness = new UserBusiness_1.default();
                        return [4 /*yield*/, userBusiness.register(signUpParams)];
                    case 1:
                        result = _a.sent();
                        if (result.error)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error
                                }))];
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data
                            })];
                    case 2:
                        err_6 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later."
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        decorators_1.post("/authentication"),
        decorators_1.requestValidators("email", "password", "audience"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "postLogin", null);
    __decorate([
        decorators_1.post("/account/password/reset"),
        decorators_1.requestValidators("email", "audience", "confirmationUrl"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "postforgotPassword", null);
    __decorate([
        decorators_1.post("/account/password/change"),
        decorators_1.requestValidators("oldPassword", "newPassword"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "postChangePassword", null);
    __decorate([
        decorators_1.post("/account/resend-link"),
        decorators_1.requestValidators("email", "audience", "confirmationUrl"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "postResendVerificationLink", null);
    __decorate([
        decorators_1.post("/account/verify"),
        decorators_1.requestValidators("email", "audience", "token"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "postVerifyEmail", null);
    __decorate([
        decorators_1.post("/account/signup"),
        decorators_1.requestValidators("email", "password", "audience", "fullName", "userType", "confirmationUrl"),
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
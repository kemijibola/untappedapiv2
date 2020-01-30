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
var ApplicationBusiness = require("../app/business/ApplicationBusiness");
var ValidateRequest_1 = require("../middlewares/ValidateRequest");
var auth_1 = require("../middlewares/auth");
var PermissionConstant_1 = require("../utils/lib/PermissionConstant");
var ApplicationController = /** @class */ (function () {
    function ApplicationController() {
    }
    ApplicationController.prototype.fetch = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var condition, applicationBusiness, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = {};
                        if (req.query) {
                            condition.identity = req.query.audience;
                        }
                        applicationBusiness = new ApplicationBusiness();
                        return [4 /*yield*/, applicationBusiness.fetch(condition)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                                    code: result.responseCode,
                                    message: "Error occured. " + result.error
                                }))];
                        }
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data
                            })];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured." + err_1
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApplicationController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var item, applicationBusiness, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        item = req.body;
                        if (item.refreshTokenExpiration < 1)
                            return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                                    code: 400,
                                    message: "refreshTokenExpiration is invalid, expects a value in seconds."
                                }))];
                        if (item.refreshTokenExpiration > 604800) {
                            return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                                    code: 400,
                                    message: "refreshTokenExpiration can not be more than 7 days"
                                }))];
                        }
                        item.clientId.toLowerCase();
                        applicationBusiness = new ApplicationBusiness();
                        return [4 /*yield*/, applicationBusiness.create(item)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                                    code: result.responseCode,
                                    message: "Error occured. " + result.error
                                }))];
                        }
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data
                            })];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured." + err_2
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        decorators_1.get("/"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ApplicationController.prototype, "fetch", null);
    __decorate([
        decorators_1.post("/"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        decorators_1.requestValidators("name", "audience", "clientId", "emailConfirmationRedirectUrl", "refreshTokenExpiration"),
        decorators_1.authorize(PermissionConstant_1.canCreateApplication),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ApplicationController.prototype, "create", null);
    ApplicationController = __decorate([
        decorators_1.controller("/v1/application")
    ], ApplicationController);
    return ApplicationController;
}());
exports.ApplicationController = ApplicationController;
//# sourceMappingURL=ApplicationController.js.map
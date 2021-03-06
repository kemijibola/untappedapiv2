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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("../decorators");
var ProfileBusiness = require("../app/business/ProfileBusiness");
var error_1 = require("../utils/error");
var auth_1 = require("../middlewares/auth");
var ValidateRequest_1 = require("../middlewares/ValidateRequest");
var _ = __importStar(require("underscore"));
var PermissionConstant_1 = require("../utils/lib/PermissionConstant");
var ProfileController = /** @class */ (function () {
    function ProfileController() {
    }
    ProfileController.prototype.fetch = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var condition, profileBusiness, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = {};
                        if (req.body) {
                            condition = req.body;
                        }
                        profileBusiness = new ProfileBusiness();
                        return [4 /*yield*/, profileBusiness.fetch(condition)];
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
                                message: "Internal Server error occured. Please try again.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProfileController.prototype.fetchTalents = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                }
                catch (err) {
                    return [2 /*return*/, next(new error_1.PlatformError({
                            code: 500,
                            message: "Internal Server error occured. Please try again.",
                        }))];
                }
                return [2 /*return*/];
            });
        });
    };
    ProfileController.prototype.fetchUserProfile = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var profileBusiness, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        profileBusiness = new ProfileBusiness();
                        return [4 /*yield*/, profileBusiness.findByUser(req.user)];
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
                                message: "Internal Server error occured. Please try again.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProfileController.prototype.fetchProfile = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var profileBusiness, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        profileBusiness = new ProfileBusiness();
                        return [4 /*yield*/, profileBusiness.fetch({})];
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
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProfileController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var item, profileBusiness, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        item = req.body;
                        if (_.has(req.body.userAddress, "address")) {
                            item.location = req.body.userAddress.address.location;
                            item.formattedAddres = req.body.userAddress.address.formattedAddres;
                        }
                        if (!item.location || !item.formattedAddres) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide location",
                                }))];
                        }
                        if (item.shortBio) {
                            if (item.shortBio.trim().length < 80 ||
                                item.shortBio.trim().length > 2000) {
                                return [2 /*return*/, next(new error_1.PlatformError({
                                        code: 400,
                                        message: "Short bio length must be greater than 80 and less that 2000",
                                    }))];
                            }
                        }
                        item.user = req.user;
                        profileBusiness = new ProfileBusiness();
                        return [4 /*yield*/, profileBusiness.create(item)];
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
    ProfileController.prototype.updateProfile = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var item, id, profileBusiness, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        item = req.body;
                        item.user = req.user;
                        id = req.params.id;
                        if (_.has(req.body.userAddress, "address")) {
                            item.location = req.body.userAddress.address.location;
                            item.formattedAddres = req.body.userAddress.address.formattedAddres;
                        }
                        profileBusiness = new ProfileBusiness();
                        return [4 /*yield*/, profileBusiness.patch(id, item)];
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
                        err_5 = _a.sent();
                        console.log(err_5);
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProfileController.prototype.postTalentLike = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var profileBusiness, talentProfile, userHasLiked, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!req.body.userId)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide userId",
                                }))];
                        profileBusiness = new ProfileBusiness();
                        console.log("from controller", req.body.userId);
                        return [4 /*yield*/, profileBusiness.findByCriteria({
                                user: req.body.userId,
                            })];
                    case 1:
                        talentProfile = _a.sent();
                        if (talentProfile.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: talentProfile.responseCode,
                                    message: talentProfile.error,
                                }))];
                        }
                        if (!talentProfile.data) return [3 /*break*/, 3];
                        userHasLiked = talentProfile.data.tappedBy.filter(function (x) { return x == req.user; })[0];
                        if (userHasLiked) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "You have already performed Like operation.",
                                }))];
                        }
                        talentProfile.data.tappedBy = talentProfile.data.tappedBy.concat([
                            req.user,
                        ]);
                        return [4 /*yield*/, profileBusiness.updateLike(talentProfile.data._id, talentProfile.data)];
                    case 2:
                        result = _a.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        }
                        return [2 /*return*/, res.status(200).json({
                                message: "Operation successful",
                                data: true,
                            })];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_6 = _a.sent();
                        console.log(err_6);
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProfileController.prototype.postTalentUnLike = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var profileBusiness, talentProfile, userHasLiked, result, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!req.body.userId)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide userId",
                                }))];
                        profileBusiness = new ProfileBusiness();
                        return [4 /*yield*/, profileBusiness.findByCriteria({
                                user: req.body.userId,
                            })];
                    case 1:
                        talentProfile = _a.sent();
                        if (talentProfile.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: talentProfile.responseCode,
                                    message: talentProfile.error,
                                }))];
                        }
                        if (!talentProfile.data) return [3 /*break*/, 3];
                        userHasLiked = talentProfile.data.tappedBy.filter(function (x) { return x == req.user; })[0];
                        if (!userHasLiked) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "You have not liked talent",
                                }))];
                        }
                        talentProfile.data.tappedBy = talentProfile.data.tappedBy.filter(function (x) { return x != req.user; });
                        return [4 /*yield*/, profileBusiness.updateLike(talentProfile.data._id, talentProfile.data)];
                    case 2:
                        result = _a.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        }
                        return [2 /*return*/, res.status(200).json({
                                message: "Operation successful",
                                data: true,
                            })];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_7 = _a.sent();
                        console.log(err_7);
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProfileController.prototype.fetchPendingMedia = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var profileBusiness, result, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        profileBusiness = new ProfileBusiness();
                        return [4 /*yield*/, profileBusiness.fetchPendingTalentProfile({
                                isProfileCompleted: false,
                            })];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: "Error occured, " + result.error,
                                }))];
                        }
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Media Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_8 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured." + err_8,
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        decorators_1.use(auth_1.requireAuth),
        decorators_1.get("/"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ProfileController.prototype, "fetch", null);
    __decorate([
        decorators_1.get("/"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ProfileController.prototype, "fetchTalents", null);
    __decorate([
        decorators_1.get("/user"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ProfileController.prototype, "fetchUserProfile", null);
    __decorate([
        decorators_1.get("/:id"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ProfileController.prototype, "fetchProfile", null);
    __decorate([
        decorators_1.use(auth_1.requireAuth),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.post("/"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ProfileController.prototype, "create", null);
    __decorate([
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        decorators_1.put("/:id"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ProfileController.prototype, "updateProfile", null);
    __decorate([
        decorators_1.post("/talent/like"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.requestValidators("userId"),
        decorators_1.use(auth_1.requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ProfileController.prototype, "postTalentLike", null);
    __decorate([
        decorators_1.post("/talent/unLike"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.requestValidators("userId"),
        decorators_1.use(auth_1.requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ProfileController.prototype, "postTalentUnLike", null);
    __decorate([
        decorators_1.get("/admin/talents/pending"),
        decorators_1.use(auth_1.requireAuth),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.authorize(PermissionConstant_1.canViewTalents),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ProfileController.prototype, "fetchPendingMedia", null);
    ProfileController = __decorate([
        decorators_1.controller("/v1/profiles")
    ], ProfileController);
    return ProfileController;
}());
exports.ProfileController = ProfileController;
//# sourceMappingURL=ProfileController.js.map
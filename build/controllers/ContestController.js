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
var interfaces_1 = require("../app/models/interfaces");
var ContestBusiness = require("../app/business/ContestBusiness");
var error_1 = require("../utils/error");
var ValidateRequest_1 = require("../middlewares/ValidateRequest");
var auth_1 = require("../middlewares/auth");
var PermissionConstant_1 = require("../utils/lib/PermissionConstant");
var date_fns_1 = require("date-fns");
var config = module.require("../config/keys");
var ContestController = /** @class */ (function () {
    function ContestController() {
    }
    ContestController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var item, mediaType, systemMediaTypes, prizePositions, _i, _a, prize, _b, _c, prize, contestBusiness, result, err_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        item = req.body;
                        if (!item.title)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide contest title",
                                }))];
                        if (!item.information)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide contest information",
                                }))];
                        if (date_fns_1.isAfter(Date.now(), item.startDate)) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Contest start date must be today or a later date",
                                }))];
                        }
                        if (date_fns_1.differenceInDays(item.startDate, item.endDate) > 14) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Contest duration must not exceed 14 days from start date",
                                }))];
                        }
                        mediaType = item.entryMediaType.toLowerCase();
                        systemMediaTypes = Object.values(interfaces_1.MediaType);
                        if (!systemMediaTypes.includes(mediaType)) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Contest entry media type is invalid",
                                }))];
                        }
                        if (item.redeemable.length < 1) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please add at least one winner to contest",
                                }))];
                        }
                        if (item.redeemable.length > 5) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Contest can not have more than 5 winners",
                                }))];
                        }
                        prizePositions = Object.values(interfaces_1.PrizePosition);
                        for (_i = 0, _a = item.redeemable; _i < _a.length; _i++) {
                            prize = _a[_i];
                            if (!prizePositions.includes(prize.name)) {
                                return [2 /*return*/, next(new error_1.PlatformError({
                                        code: 400,
                                        message: "Invalid prize position",
                                    }))];
                            }
                        }
                        for (_b = 0, _c = item.redeemable; _b < _c.length; _b++) {
                            prize = _c[_b];
                            if (prize.prizeCash < config.MiNIMUM_PRIZE_CASH) {
                                return [2 /*return*/, next(new error_1.PlatformError({
                                        code: 400,
                                        message: "Minimum prize cash must be NGN " + config.MiNIMUM_PRIZE_CASH,
                                    }))];
                            }
                        }
                        item.createdBy = req.user;
                        contestBusiness = new ContestBusiness();
                        return [4 /*yield*/, contestBusiness.create(item)];
                    case 1:
                        result = _d.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        }
                        return [2 /*return*/, res.status(201).json({
                                message: "Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_1 = _d.sent();
                        console.log(err_1);
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContestController.prototype.createSMSVoteOnlyCompetition = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var item, contestBusiness, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        item = req.body;
                        if (!item.title)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide competition title",
                                }))];
                        if (date_fns_1.isAfter(Date.now(), item.startDate)) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Contest start date must be today or a later date",
                                }))];
                        }
                        if (item.numberOfParticipants < 2)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide at least 2 participants for the competition",
                                }))];
                        item.createdBy = req.user;
                        contestBusiness = new ContestBusiness();
                        return [4 /*yield*/, contestBusiness.createSMSVoteCompetition(item)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        }
                        return [2 /*return*/, res.status(201).json({
                                message: "Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContestController.prototype.updateContest = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var item, mediaType, systemMediaTypes, prizePositions, _i, _a, prize, _b, _c, prize, contestBusiness, result, err_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        item = req.body;
                        if (!item.title)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide contest title",
                                }))];
                        if (!item.information)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide contest information",
                                }))];
                        if (date_fns_1.isAfter(Date.now(), item.startDate)) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Contest start date must be today or a later date",
                                }))];
                        }
                        if (date_fns_1.differenceInDays(item.startDate, item.endDate) > 14) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Contest duration must not exceed 14 days from start date",
                                }))];
                        }
                        mediaType = item.entryMediaType.toLowerCase();
                        systemMediaTypes = Object.values(interfaces_1.MediaType);
                        if (!systemMediaTypes.includes(mediaType)) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Contest entry media type is invalid",
                                }))];
                        }
                        if (item.redeemable.length < 1) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please add at least one winner to contest",
                                }))];
                        }
                        if (item.redeemable.length > 5) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Contest can not have more than 5 winners",
                                }))];
                        }
                        prizePositions = Object.values(interfaces_1.PrizePosition);
                        for (_i = 0, _a = item.redeemable; _i < _a.length; _i++) {
                            prize = _a[_i];
                            if (!prizePositions.includes(prize.name)) {
                                return [2 /*return*/, next(new error_1.PlatformError({
                                        code: 400,
                                        message: "Invalid prize position",
                                    }))];
                            }
                        }
                        for (_b = 0, _c = item.redeemable; _b < _c.length; _b++) {
                            prize = _c[_b];
                            if (prize.prizeCash < config.MiNIMUM_PRIZE_CASH) {
                                return [2 /*return*/, next(new error_1.PlatformError({
                                        code: 400,
                                        message: "Minimum prize cash must be NGN " + config.MiNIMUM_PRIZE_CASH,
                                    }))];
                            }
                        }
                        item.createdBy = req.user;
                        contestBusiness = new ContestBusiness();
                        return [4 /*yield*/, contestBusiness.update(item._id, item)];
                    case 1:
                        result = _d.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        }
                        return [2 /*return*/, res.status(201).json({
                                message: "Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_3 = _d.sent();
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
    ContestController.prototype.fetchContestPreviewList = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var reqPageNo, pageNo, reqSize, size, condition, contestBusiness, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        reqPageNo = req.query.pageNo || 0;
                        pageNo = parseInt(reqPageNo) !== 0 ? parseInt(reqPageNo) : 0;
                        reqSize = req.query.size || 10;
                        size = parseInt(reqSize);
                        condition = {
                            paymentStatus: interfaces_1.PaymentStatus.Completed,
                            approved: true,
                            isSmsOnly: false,
                        };
                        contestBusiness = new ContestBusiness();
                        return [4 /*yield*/, contestBusiness.fetchContestList(condition, size, pageNo)];
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
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContestController.prototype.fetchContestDetailsById = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var condition, contestBusiness, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = {};
                        contestBusiness = new ContestBusiness();
                        return [4 /*yield*/, contestBusiness.fetchContestDetailsById(req.params.id)];
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
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContestController.prototype.fetchPendingMedia = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var contestBusiness, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        contestBusiness = new ContestBusiness();
                        return [4 /*yield*/, contestBusiness.fetch({
                                approved: false,
                                paymentStatus: interfaces_1.PaymentStatus.Completed,
                                isSmsOnly: false,
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
                        err_6 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured." + err_6,
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContestController.prototype.fetchContestPendingDisbursement = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var condition, contestBusiness, result, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition = {};
                        contestBusiness = new ContestBusiness();
                        return [4 /*yield*/, contestBusiness.fetch({
                                endDate: { $gte: date_fns_1.startOfToday(), $lte: new Date() },
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
    ContestController.prototype.likeContest = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var contestBusiness, contest, userHasLiked, result, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        contestBusiness = new ContestBusiness();
                        return [4 /*yield*/, contestBusiness.findById(req.params.id)];
                    case 1:
                        contest = _a.sent();
                        if (contest.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: contest.responseCode,
                                    message: contest.error,
                                }))];
                        }
                        if (!contest.data) return [3 /*break*/, 3];
                        userHasLiked = contest.data.likedBy.filter(function (x) { return x == req.user; })[0];
                        if (userHasLiked) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "You have already liked contest.",
                                }))];
                        }
                        contest.data.likedBy = contest.data.likedBy.concat([req.user]);
                        return [4 /*yield*/, contestBusiness.update(req.params.id, contest.data)];
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
                        err_8 = _a.sent();
                        console.log(err_8);
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ContestController.prototype.postContesttUnLike = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var contestBusiness, contest, userId, userHasLiked, result, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        contestBusiness = new ContestBusiness();
                        return [4 /*yield*/, contestBusiness.findById(req.params.id)];
                    case 1:
                        contest = _a.sent();
                        if (contest.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: contest.responseCode,
                                    message: contest.error,
                                }))];
                        }
                        if (!contest.data) return [3 /*break*/, 3];
                        userId = req.user;
                        userHasLiked = contest.data.likedBy.filter(function (x) { return x == req.user; })[0];
                        if (!userHasLiked) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Yo have not liked contest",
                                }))];
                        }
                        contest.data.likedBy = contest.data.likedBy.filter(function (x) { return x != req.user; });
                        return [4 /*yield*/, contestBusiness.update(req.params.id, contest.data)];
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
                        err_9 = _a.sent();
                        console.log(err_9);
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ContestController.prototype.postPageView = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var contestBusiness, contest, result, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        contestBusiness = new ContestBusiness();
                        return [4 /*yield*/, contestBusiness.findById(req.params.id)];
                    case 1:
                        contest = _a.sent();
                        if (contest.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: contest.responseCode,
                                    message: contest.error,
                                }))];
                        }
                        if (!contest.data) return [3 /*break*/, 3];
                        return [4 /*yield*/, contestBusiness.patchCount(req.params.id, {
                                views: contest.data.views + 1,
                            })];
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
                        err_10 = _a.sent();
                        console.log(err_10);
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ContestController.prototype.fetchAllContestByProfessional = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var contestBusiness, result, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        contestBusiness = new ContestBusiness();
                        return [4 /*yield*/, contestBusiness.paginatedFetch({
                                createdBy: req.user,
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
                        err_11 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContestController.prototype.fetchContestParticipants = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var contestBusiness, result, err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        contestBusiness = new ContestBusiness();
                        return [4 /*yield*/, contestBusiness.fetchContestParticipants(req.params.id, req.user)];
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
                        err_12 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // @get("/user/contests")
    // @use(requestValidator)
    // async fetchContestListByUser(
    //   req: RequestWithUser,
    //   res: Response,
    //   next: NextFunction
    // ) {
    //   try {
    //     const userId: string = req.user;
    //     const contestBusiness = new ContestBusiness();
    //     const result = await contestBusiness.fetchContestListByUser(userId);
    //     if (result.error) {
    //       return next(
    //         new PlatformError({
    //           code: result.responseCode,
    //           message: result.error,
    //         })
    //       );
    //     }
    //     return res.status(result.responseCode).json({
    //       message: "Operation successful",
    //       data: result.data,
    //     });
    //   } catch (err) {
    //     return next(
    //       new PlatformError({
    //         code: 500,
    //         message: "Internal Server error occured. Please try again later.",
    //       })
    //     );
    //   }
    // }
    ContestController.prototype.fetch = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var contestBusiness, result, err_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        contestBusiness = new ContestBusiness();
                        return [4 /*yield*/, contestBusiness.fetch({
                                approved: true,
                                paymentStatus: interfaces_1.PaymentStatus.Completed,
                                isSmsOnly: false,
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
                        err_13 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContestController.prototype.checkIfContestTtitleIsAvailable = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var condition, contestBusiness, result, err_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!req.query.title) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide contest title",
                                }))];
                        }
                        condition = {
                            title: new RegExp("^" + req.query.title + "$", "i"),
                        };
                        contestBusiness = new ContestBusiness();
                        return [4 /*yield*/, contestBusiness.fetch(condition)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        }
                        if (result.data) {
                            if (result.data.length > 0) {
                                if (result.data[0].code) {
                                    return [2 /*return*/, res.status(200).json({
                                            message: "Operation successful",
                                            isAvailable: false,
                                        })];
                                }
                                else {
                                    return [2 /*return*/, res.status(200).json({
                                            message: "Operation successful",
                                            isAvailable: true,
                                            contestId: result.data[0]._id,
                                        })];
                                }
                            }
                            else
                                return [2 /*return*/, res.status(200).json({
                                        message: "Operation successfu",
                                        isAvailable: true,
                                    })];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_14 = _a.sent();
                        console.log(err_14);
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContestController.prototype.approveContest = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var contestBusiness, result, err_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        contestBusiness = new ContestBusiness();
                        return [4 /*yield*/, contestBusiness.approveContest(req.params.id, req.user)];
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
                        err_15 = _a.sent();
                        console.log(err_15);
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContestController.prototype.rejectContest = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var contestBusiness, result, err_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!req.body.reason)
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide rejection reason",
                                }))];
                        contestBusiness = new ContestBusiness();
                        return [4 /*yield*/, contestBusiness.rejectContest(req.params.id, req.user, req.body.reason)];
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
                        err_16 = _a.sent();
                        console.log(err_16);
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
        decorators_1.post("/"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        decorators_1.requestValidators("title", "information", "startDate", "endDate", "entryMediaType", "redeemable"),
        decorators_1.authorize(PermissionConstant_1.canCreateContest),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ContestController.prototype, "create", null);
    __decorate([
        decorators_1.post("/sms-vote/competition"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        decorators_1.requestValidators("title", "startDate", "endDate", "numberOfParticipants"),
        decorators_1.authorize(PermissionConstant_1.canCreateContest),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ContestController.prototype, "createSMSVoteOnlyCompetition", null);
    __decorate([
        decorators_1.put("/:id"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        decorators_1.requestValidators("title", "information", "startDate", "endDate", "entryMediaType", "redeemable"),
        decorators_1.authorize(PermissionConstant_1.canCreateContest),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ContestController.prototype, "updateContest", null);
    __decorate([
        decorators_1.get("/preview/list"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ContestController.prototype, "fetchContestPreviewList", null);
    __decorate([
        decorators_1.get("/:id"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ContestController.prototype, "fetchContestDetailsById", null);
    __decorate([
        decorators_1.get("/admin/pending"),
        decorators_1.use(auth_1.requireAuth),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.authorize(PermissionConstant_1.canViewPendingContest),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ContestController.prototype, "fetchPendingMedia", null);
    __decorate([
        decorators_1.get("/pending/disbursement"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        decorators_1.use(auth_1.requireAuth),
        decorators_1.authorize(PermissionConstant_1.canViewPendingDisbursement),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ContestController.prototype, "fetchContestPendingDisbursement", null);
    __decorate([
        decorators_1.put("/:id/like"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ContestController.prototype, "likeContest", null);
    __decorate([
        decorators_1.put("/:id/unLike"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ContestController.prototype, "postContesttUnLike", null);
    __decorate([
        decorators_1.put("/:id/page-count"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ContestController.prototype, "postPageView", null);
    __decorate([
        decorators_1.get("/user/contests"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ContestController.prototype, "fetchAllContestByProfessional", null);
    __decorate([
        decorators_1.get("/:id/participants"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        decorators_1.authorize(PermissionConstant_1.canCreateContest),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ContestController.prototype, "fetchContestParticipants", null);
    __decorate([
        decorators_1.get("/"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ContestController.prototype, "fetch", null);
    __decorate([
        decorators_1.get("/validate/title"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ContestController.prototype, "checkIfContestTtitleIsAvailable", null);
    __decorate([
        decorators_1.put("/admin/approve/:id"),
        decorators_1.use(auth_1.requireAuth),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.authorize(PermissionConstant_1.canApproveContest),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ContestController.prototype, "approveContest", null);
    __decorate([
        decorators_1.put("/admin/reject/:id"),
        decorators_1.use(auth_1.requireAuth),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.authorize(PermissionConstant_1.canApproveContest),
        decorators_1.requestValidators("reason"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ContestController.prototype, "rejectContest", null);
    ContestController = __decorate([
        decorators_1.controller("/v1/contests")
    ], ContestController);
    return ContestController;
}());
exports.ContestController = ContestController;
//# sourceMappingURL=ContestController.js.map
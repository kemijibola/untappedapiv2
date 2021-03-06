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
var interfaces_1 = require("../app/models/interfaces");
var VoteTransactionBusiness = require("../app/business/VoteTransactionBusiness");
var ValidateRequest_1 = require("../middlewares/ValidateRequest");
var PermissionConstant_1 = require("../utils/lib/PermissionConstant");
var ContestBusiness = require("../app/business/ContestBusiness");
var auth_1 = require("../middlewares/auth");
var config = module.require("../config/keys");
var VoteController = /** @class */ (function () {
    function VoteController() {
    }
    VoteController.prototype.fetchContestEntries = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var contestId, contestBusiness, contest, voteTransactionBusiness, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        contestId = req.params.id;
                        contestBusiness = new ContestBusiness();
                        return [4 /*yield*/, contestBusiness.findById(contestId)];
                    case 1:
                        contest = _a.sent();
                        if (contest.error)
                            return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                                    code: 404,
                                    message: contest.error,
                                }))];
                        if (!contest.data) return [3 /*break*/, 3];
                        voteTransactionBusiness = new VoteTransactionBusiness();
                        return [4 /*yield*/, voteTransactionBusiness.FetchContestResult(contest.data)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                message: "Operation successful",
                                data: result,
                            })];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    VoteController.prototype.fetchContestVoteResult = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var contestId, voteTransactionBusiness, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        contestId = req.params.id;
                        voteTransactionBusiness = new VoteTransactionBusiness();
                        return [4 /*yield*/, voteTransactionBusiness.fetchContestResult(contestId, req.user)];
                    case 1:
                        result = _a.sent();
                        if (result.error)
                            return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                                    code: 404,
                                    message: result.error,
                                }))];
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VoteController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var apiKey, contestKeyPart, decoded, item, voteBusiness, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        apiKey = req.headers["x-signature"];
                        if (!apiKey)
                            return [2 /*return*/, res.sendStatus(400)];
                        if (!req.body.id ||
                            !req.body.phone ||
                            !req.body.shortcode ||
                            !req.body.network ||
                            !req.body.message)
                            return [2 /*return*/, res.sendStatus(400)];
                        contestKeyPart = req.body.message.split(" ");
                        if (contestKeyPart.length < 2)
                            return [2 /*return*/, res.sendStatus(400)];
                        decoded = Buffer.from(apiKey, "base64").toString();
                        if (decoded !== config.CEASER_SECRET)
                            return [2 /*return*/, res.sendStatus(400)];
                        item = Object.assign({
                            channelId: req.body.id,
                            phone: req.body.phone,
                            network: req.body.network,
                            shortcode: req.body.shortcode,
                            contestantCode: contestKeyPart[1].toUpperCase(),
                            keyword: contestKeyPart[0] ? contestKeyPart[0].toLowerCase() : "JUNK",
                            channelType: interfaces_1.ChannelType.sms,
                        });
                        voteBusiness = new VoteTransactionBusiness();
                        return [4 /*yield*/, voteBusiness.createSMSVote(item)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new ApplicationError_1.PlatformError({
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
                        console.log("");
                        return [2 /*return*/, next(new ApplicationError_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        decorators_1.get("/contest/:id/result"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], VoteController.prototype, "fetchContestEntries", null);
    __decorate([
        decorators_1.get("/contests/:id/result"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        decorators_1.authorize(PermissionConstant_1.canCreateContest),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], VoteController.prototype, "fetchContestVoteResult", null);
    __decorate([
        decorators_1.post("/"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], VoteController.prototype, "create", null);
    VoteController = __decorate([
        decorators_1.controller("/v1/votes")
    ], VoteController);
    return VoteController;
}());
exports.VoteController = VoteController;
//# sourceMappingURL=VoteController.js.map
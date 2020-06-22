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
var VoteTransactionRepository_1 = __importDefault(require("../repository/VoteTransactionRepository"));
var interfaces_1 = require("../models/interfaces");
var Result_1 = require("../../utils/Result");
var ContestRepository_1 = __importDefault(require("../repository/ContestRepository"));
var ContestEntryRepository_1 = __importDefault(require("../repository/ContestEntryRepository"));
var date_fns_1 = require("date-fns");
var VoteTransactionBusiness = /** @class */ (function () {
    function VoteTransactionBusiness() {
        this._voteTransactionRepository = new VoteTransactionRepository_1.default();
        this._contestRepository = new ContestRepository_1.default();
        this._contestEntryRepository = new ContestEntryRepository_1.default();
    }
    VoteTransactionBusiness.prototype.fetch = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var voteTransactions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._voteTransactionRepository.fetch(condition)];
                    case 1:
                        voteTransactions = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, voteTransactions)];
                }
            });
        });
    };
    VoteTransactionBusiness.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var voteTransaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request")];
                        return [4 /*yield*/, this._voteTransactionRepository.findById(id)];
                    case 1:
                        voteTransaction = _a.sent();
                        if (!voteTransaction)
                            return [2 /*return*/, Result_1.Result.fail(404, "Vote not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, voteTransaction)];
                }
            });
        });
    };
    VoteTransactionBusiness.prototype.findOne = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var voteTransaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!condition)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request")];
                        return [4 /*yield*/, this._voteTransactionRepository.findByOne(condition)];
                    case 1:
                        voteTransaction = _a.sent();
                        if (!voteTransaction)
                            return [2 /*return*/, Result_1.Result.fail(404, "Vote not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, voteTransaction)];
                }
            });
        });
    };
    VoteTransactionBusiness.prototype.findByCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var voteTransaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._voteTransactionRepository.findByCriteria(criteria)];
                    case 1:
                        voteTransaction = _a.sent();
                        if (!voteTransaction)
                            return [2 /*return*/, Result_1.Result.fail(404, "Vote not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, voteTransaction)];
                }
            });
        });
    };
    VoteTransactionBusiness.prototype.fetchContestantVoteCount = function (contest, contestantCode) {
        return __awaiter(this, void 0, void 0, function () {
            var votes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._voteTransactionRepository.fetch({
                            contestantCode: contestantCode,
                            contestId: contest,
                            voteStatus: interfaces_1.VoteStatus.valid,
                        })];
                    case 1:
                        votes = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, votes.length)];
                }
            });
        });
    };
    VoteTransactionBusiness.prototype.createSMSVote = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var contestEntry, newVote_1, contest, newVote_2, newVote_3, newVote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._contestEntryRepository.findByCriteria({
                            contestantCode: item.contestantCode,
                        })];
                    case 1:
                        contestEntry = _a.sent();
                        if (!!contestEntry) return [3 /*break*/, 3];
                        item.voteStatus = interfaces_1.VoteStatus.invalid;
                        return [4 /*yield*/, this._voteTransactionRepository.create(item)];
                    case 2:
                        newVote_1 = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(201, newVote_1)];
                    case 3:
                        item.contestId = contestEntry.contest;
                        return [4 /*yield*/, this._contestRepository.findById(item.contestId)];
                    case 4:
                        contest = _a.sent();
                        if (!!contest) return [3 /*break*/, 6];
                        item.voteStatus = interfaces_1.VoteStatus.invalid;
                        return [4 /*yield*/, this._voteTransactionRepository.create(item)];
                    case 5:
                        newVote_2 = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(201, newVote_2)];
                    case 6:
                        if (!contest) return [3 /*break*/, 8];
                        if (!date_fns_1.isAfter(Date.now(), contest.endDate)) return [3 /*break*/, 8];
                        item.voteStatus = interfaces_1.VoteStatus.invalid;
                        return [4 /*yield*/, this._voteTransactionRepository.create(item)];
                    case 7:
                        newVote_3 = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(201, newVote_3)];
                    case 8:
                        item.voteStatus = interfaces_1.VoteStatus.valid;
                        return [4 /*yield*/, this._voteTransactionRepository.create(item)];
                    case 9:
                        newVote = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(201, newVote)];
                }
            });
        });
    };
    VoteTransactionBusiness.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var newVote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._voteTransactionRepository.create(item)];
                    case 1:
                        newVote = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(201, newVote)];
                }
            });
        });
    };
    VoteTransactionBusiness.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var vote, updateObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._voteTransactionRepository.findById(id)];
                    case 1:
                        vote = _a.sent();
                        if (!vote)
                            return [2 /*return*/, Result_1.Result.fail(404, "Vote not found")];
                        return [4 /*yield*/, this._voteTransactionRepository.update(vote._id, item)];
                    case 2:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                }
            });
        });
    };
    VoteTransactionBusiness.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isDeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._voteTransactionRepository.delete(id)];
                    case 1:
                        isDeleted = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, isDeleted)];
                }
            });
        });
    };
    return VoteTransactionBusiness;
}());
Object.seal(VoteTransactionBusiness);
module.exports = VoteTransactionBusiness;
//# sourceMappingURL=VoteTransactionBusiness.js.map
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
var Contest_1 = require("./../models/interfaces/Contest");
var ContestRepository_1 = __importDefault(require("../repository/ContestRepository"));
var ContestEntryRepository_1 = __importDefault(require("../repository/ContestEntryRepository"));
var CommentRepository_1 = __importDefault(require("../repository/CommentRepository"));
var VoteTransactionRepository_1 = __importDefault(require("../repository/VoteTransactionRepository"));
var WalletDataRepository_1 = __importDefault(require("../repository/WalletDataRepository"));
var interfaces_1 = require("../models/interfaces");
var Result_1 = require("../../utils/Result");
var lib_1 = require("../../utils/lib");
var ContestBusiness = /** @class */ (function () {
    function ContestBusiness() {
        this._contestRepository = new ContestRepository_1.default();
        this._contestEntryRepository = new ContestEntryRepository_1.default();
        this._commentRepository = new CommentRepository_1.default();
        this._voteTransactionRepository = new VoteTransactionRepository_1.default();
        this._walletDataRepository = new WalletDataRepository_1.default();
    }
    ContestBusiness.prototype.fetch = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var contests;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(condition);
                        return [4 /*yield*/, this._contestRepository.fetch(condition)];
                    case 1:
                        contests = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, contests)];
                }
            });
        });
    };
    ContestBusiness.prototype.fetchContestList = function (condition, perPage, page) {
        return __awaiter(this, void 0, void 0, function () {
            var contests, modified;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._contestRepository.fetchContests(condition, page, perPage)];
                    case 1:
                        contests = _a.sent();
                        return [4 /*yield*/, this.fetchRunningContest(contests)];
                    case 2:
                        modified = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, modified)];
                }
            });
        });
    };
    ContestBusiness.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var contest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request.")];
                        return [4 /*yield*/, this._contestRepository.findById(id)];
                    case 1:
                        contest = _a.sent();
                        if (!contest)
                            return [2 /*return*/, Result_1.Result.fail(404, "Contest not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, contest)];
                }
            });
        });
    };
    ContestBusiness.prototype.fetchDashboardContest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, latestContests, _i, latestContests_1, item, entries, contestPreview, contestEntry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("called");
                        result = [];
                        return [4 /*yield*/, this._contestRepository.fetchWithLimit({
                                endDate: { $gte: new Date() },
                            })];
                    case 1:
                        latestContests = _a.sent();
                        _i = 0, latestContests_1 = latestContests;
                        _a.label = 2;
                    case 2:
                        if (!(_i < latestContests_1.length)) return [3 /*break*/, 5];
                        item = latestContests_1[_i];
                        return [4 /*yield*/, this._contestEntryRepository.fetchWithUser({ contest: item._id })];
                    case 3:
                        entries = _a.sent();
                        contestPreview = {
                            _id: item._id,
                            title: item.title,
                            banner: item.bannerImage || "",
                            entryCount: entries.length,
                        };
                        contestEntry = {
                            contest: contestPreview,
                            entries: entries,
                        };
                        result = result.concat([contestEntry]);
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, Result_1.Result.ok(200, result)];
                }
            });
        });
    };
    ContestBusiness.prototype.fetchContestDetailsById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var contest, entries, contestDetails, _i, entries_1, entry, entryComment, contestantValidVotes, entryDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._contestRepository.findById(id)];
                    case 1:
                        contest = _a.sent();
                        if (!contest)
                            return [2 /*return*/, Result_1.Result.fail(404, "Contest not found")];
                        return [4 /*yield*/, this._contestEntryRepository.fetchWithUser({
                                contest: contest._id,
                            })];
                    case 2:
                        entries = _a.sent();
                        contestDetails = {
                            contest: contest,
                            submissions: [],
                        };
                        _i = 0, entries_1 = entries;
                        _a.label = 3;
                    case 3:
                        if (!(_i < entries_1.length)) return [3 /*break*/, 7];
                        entry = entries_1[_i];
                        return [4 /*yield*/, this._commentRepository.fetch({ entity: entry._id })];
                    case 4:
                        entryComment = _a.sent();
                        return [4 /*yield*/, this._voteTransactionRepository.fetch({
                                contestId: contest._id,
                                contestantCode: entry.contestantCode,
                                voteStatus: interfaces_1.VoteStatus.valid,
                            })];
                    case 5:
                        contestantValidVotes = _a.sent();
                        entryDetails = {
                            entry: entry,
                            commentCount: entryComment.length || 0,
                            totalVote: contestantValidVotes.length || 0,
                        };
                        contestDetails.submissions = contestDetails.submissions.concat([
                            entryDetails,
                        ]);
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 3];
                    case 7: return [2 /*return*/, Result_1.Result.ok(200, contestDetails)];
                }
            });
        });
    };
    ContestBusiness.prototype.fetchContestListByUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var totalCommentCount, contestEntryCommentCountMap, userContestResults, userContests, _i, userContests_1, item, contestEntries, _a, contestEntries_1, entry, entryComment, userContestResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        totalCommentCount = 0;
                        contestEntryCommentCountMap = {};
                        userContestResults = [];
                        return [4 /*yield*/, this._contestRepository.fetch({
                                paymentStatus: interfaces_1.PaymentStatus.Completed,
                            })];
                    case 1:
                        userContests = _b.sent();
                        _i = 0, userContests_1 = userContests;
                        _b.label = 2;
                    case 2:
                        if (!(_i < userContests_1.length)) return [3 /*break*/, 9];
                        item = userContests_1[_i];
                        return [4 /*yield*/, this._contestEntryRepository.fetch({
                                contest: item._id,
                            })];
                    case 3:
                        contestEntries = _b.sent();
                        contestEntryCommentCountMap["totalCommentCount"] = 0;
                        _a = 0, contestEntries_1 = contestEntries;
                        _b.label = 4;
                    case 4:
                        if (!(_a < contestEntries_1.length)) return [3 /*break*/, 7];
                        entry = contestEntries_1[_a];
                        return [4 /*yield*/, this._commentRepository.fetch({
                                entity: entry._id,
                            })];
                    case 5:
                        entryComment = _b.sent();
                        contestEntryCommentCountMap["totalCommentCount"] =
                            contestEntryCommentCountMap["totalCommentCount"] +
                                entryComment.length;
                        _b.label = 6;
                    case 6:
                        _a++;
                        return [3 /*break*/, 4];
                    case 7:
                        userContestResult = {
                            contestId: item._id,
                            contestTitle: item.title,
                            contestBanner: item.bannerImage || "",
                            contestViewCount: item.views || 0,
                            contestLikedByCount: item.likedBy.length,
                            entryCount: contestEntries.length,
                            commentCount: contestEntryCommentCountMap["totalCommentCount"],
                        };
                        userContestResults = userContestResults.concat([userContestResult]);
                        _b.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 2];
                    case 9: return [2 /*return*/, Result_1.Result.ok(200, userContestResults)];
                }
            });
        });
    };
    ContestBusiness.prototype.findOne = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var contest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!condition)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request.")];
                        return [4 /*yield*/, this._contestRepository.findByOne(condition)];
                    case 1:
                        contest = _a.sent();
                        if (!contest)
                            return [2 /*return*/, Result_1.Result.fail(404, "Contest not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, contest)];
                }
            });
        });
    };
    ContestBusiness.prototype.findByCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var contest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._contestRepository.findByCriteria(criteria)];
                    case 1:
                        contest = _a.sent();
                        if (!contest)
                            return [2 /*return*/, Result_1.Result.fail(404, "Contest not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, contest)];
                }
            });
        });
    };
    ContestBusiness.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var contest, newContest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._contestRepository.findByCriteria({
                            title: item.title,
                        })];
                    case 1:
                        contest = _a.sent();
                        if (contest) {
                            return [2 /*return*/, Result_1.Result.fail(409, "Contest with title " + item.title + " already exist")];
                        }
                        item.views = 0;
                        item.likedBy = [];
                        item.paymentStatus = interfaces_1.PaymentStatus.UnPaid;
                        item.issues = [];
                        item.code = lib_1.getRandomId();
                        return [4 /*yield*/, this._contestRepository.create(item)];
                    case 2:
                        newContest = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(201, newContest)];
                }
            });
        });
    };
    ContestBusiness.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var contest, updateObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._contestRepository.findById(id)];
                    case 1:
                        contest = _a.sent();
                        if (!contest)
                            return [2 /*return*/, Result_1.Result.fail(404, "Contest not found")];
                        item.paymentStatus = contest.paymentStatus;
                        item.prizeRedeemed = contest.prizeRedeemed;
                        return [4 /*yield*/, this._contestRepository.update(contest._id, item)];
                    case 2:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                }
            });
        });
    };
    ContestBusiness.prototype.disbursePayment = function (contestId) {
        return __awaiter(this, void 0, void 0, function () {
            var prizeRedeemed, contest, i, firstPlaceWinner, contestantWallet, prizeMoney, secondPlaceWinner, contestantWallet, prizeMoney, thirdPlaceWinner, contestantWallet, prizeMoney, fourthPlaceWinner, contestantWallet, prizeMoney, fifthPlaceWinner, contestantWallet, prizeMoney;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prizeRedeemed = false;
                        return [4 /*yield*/, this._contestRepository.findById(contestId)];
                    case 1:
                        contest = _a.sent();
                        if (!contest)
                            if (!contest)
                                return [2 /*return*/, Result_1.Result.fail(404, "Contest not found")];
                        if (contest.prizeRedeemed)
                            return [2 /*return*/, Result_1.Result.fail(404, "Contest prize has been redeemed")];
                        if (contest.redeemable.length < 1)
                            return [2 /*return*/, Result_1.Result.fail(404, "Contest does not have redeemables")];
                        if (!contest.positionsAssigned)
                            return [2 /*return*/, Result_1.Result.fail(400, "Please assign positions to contest entries before proceeding")];
                        i = 1;
                        _a.label = 2;
                    case 2:
                        if (!(i <= contest.redeemable.length)) return [3 /*break*/, 23];
                        if (!(i === 1)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this._contestEntryRepository.findByCriteria({
                                contest: contest._id,
                                position: interfaces_1.EntryPosition.firstplace,
                            })];
                    case 3:
                        firstPlaceWinner = _a.sent();
                        if (!firstPlaceWinner)
                            return [2 /*return*/, Result_1.Result.fail(400, "First place winner has not been assigned")];
                        return [4 /*yield*/, this._walletDataRepository.findByCriteria({
                                user: firstPlaceWinner.user,
                            })];
                    case 4:
                        contestantWallet = _a.sent();
                        if (!contestantWallet) return [3 /*break*/, 6];
                        prizeMoney = contest.redeemable.filter(function (x) { return x.name === Contest_1.PrizePosition.position1; })[0];
                        contestantWallet.balance = prizeMoney.prizeCash;
                        return [4 /*yield*/, contestantWallet.save()];
                    case 5:
                        _a.sent();
                        prizeRedeemed = true;
                        _a.label = 6;
                    case 6:
                        if (!(i === 2)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this._contestEntryRepository.findByCriteria({
                                contest: contest._id,
                                position: interfaces_1.EntryPosition.secondplace,
                            })];
                    case 7:
                        secondPlaceWinner = _a.sent();
                        if (!secondPlaceWinner)
                            return [2 /*return*/, Result_1.Result.fail(400, "Second place winner ha s notbeen assigned")];
                        return [4 /*yield*/, this._walletDataRepository.findByCriteria({
                                user: secondPlaceWinner.user,
                            })];
                    case 8:
                        contestantWallet = _a.sent();
                        if (!contestantWallet) return [3 /*break*/, 10];
                        prizeMoney = contest.redeemable.filter(function (x) { return x.name === Contest_1.PrizePosition.position2; })[0];
                        contestantWallet.balance = prizeMoney.prizeCash;
                        return [4 /*yield*/, contestantWallet.save()];
                    case 9:
                        _a.sent();
                        prizeRedeemed = true;
                        _a.label = 10;
                    case 10:
                        if (!(i === 3)) return [3 /*break*/, 14];
                        return [4 /*yield*/, this._contestEntryRepository.findByCriteria({
                                contest: contest._id,
                                position: interfaces_1.EntryPosition.thirdplace,
                            })];
                    case 11:
                        thirdPlaceWinner = _a.sent();
                        if (!thirdPlaceWinner)
                            return [2 /*return*/, Result_1.Result.fail(400, "Third place winner have not been assigned")];
                        return [4 /*yield*/, this._walletDataRepository.findByCriteria({
                                user: thirdPlaceWinner.user,
                            })];
                    case 12:
                        contestantWallet = _a.sent();
                        if (!contestantWallet) return [3 /*break*/, 14];
                        prizeMoney = contest.redeemable.filter(function (x) { return x.name === Contest_1.PrizePosition.position3; })[0];
                        contestantWallet.balance = prizeMoney.prizeCash;
                        return [4 /*yield*/, contestantWallet.save()];
                    case 13:
                        _a.sent();
                        prizeRedeemed = true;
                        _a.label = 14;
                    case 14:
                        if (!(i === 4)) return [3 /*break*/, 18];
                        return [4 /*yield*/, this._contestEntryRepository.findByCriteria({
                                contest: contest._id,
                                position: interfaces_1.EntryPosition.fourthplace,
                            })];
                    case 15:
                        fourthPlaceWinner = _a.sent();
                        if (!fourthPlaceWinner)
                            return [2 /*return*/, Result_1.Result.fail(400, "Third place winner have not been assigned")];
                        return [4 /*yield*/, this._walletDataRepository.findByCriteria({
                                user: fourthPlaceWinner.user,
                            })];
                    case 16:
                        contestantWallet = _a.sent();
                        if (!contestantWallet) return [3 /*break*/, 18];
                        prizeMoney = contest.redeemable.filter(function (x) { return x.name === Contest_1.PrizePosition.position4; })[0];
                        contestantWallet.balance = prizeMoney.prizeCash;
                        return [4 /*yield*/, contestantWallet.save()];
                    case 17:
                        _a.sent();
                        prizeRedeemed = true;
                        _a.label = 18;
                    case 18:
                        if (!(i === 5)) return [3 /*break*/, 22];
                        return [4 /*yield*/, this._contestEntryRepository.findByCriteria({
                                contest: contest._id,
                                position: interfaces_1.EntryPosition.fifthplace,
                            })];
                    case 19:
                        fifthPlaceWinner = _a.sent();
                        if (!fifthPlaceWinner)
                            return [2 /*return*/, Result_1.Result.fail(400, "Third place winner have not been assigned")];
                        return [4 /*yield*/, this._walletDataRepository.findByCriteria({
                                user: fifthPlaceWinner.user,
                            })];
                    case 20:
                        contestantWallet = _a.sent();
                        if (!contestantWallet) return [3 /*break*/, 22];
                        prizeMoney = contest.redeemable.filter(function (x) { return x.name === Contest_1.PrizePosition.position5; })[0];
                        contestantWallet.balance = prizeMoney.prizeCash;
                        return [4 /*yield*/, contestantWallet.save()];
                    case 21:
                        _a.sent();
                        prizeRedeemed = true;
                        _a.label = 22;
                    case 22:
                        i++;
                        return [3 /*break*/, 2];
                    case 23:
                        if (!prizeRedeemed) return [3 /*break*/, 25];
                        contest.prizeRedeemed = true;
                        return [4 /*yield*/, contest.save()];
                    case 24:
                        _a.sent();
                        _a.label = 25;
                    case 25: return [2 /*return*/, Result_1.Result.ok(200, contest)];
                }
            });
        });
    };
    ContestBusiness.prototype.patch = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var contest, updateObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._contestRepository.findById(id)];
                    case 1:
                        contest = _a.sent();
                        if (!contest)
                            return [2 /*return*/, Result_1.Result.fail(404, "Contest not found")];
                        item.paymentStatus = contest.paymentStatus;
                        item.prizeRedeemed = contest.prizeRedeemed;
                        return [4 /*yield*/, this._contestRepository.update(contest._id, item)];
                    case 2:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                }
            });
        });
    };
    ContestBusiness.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isDeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._contestRepository.delete(id)];
                    case 1:
                        isDeleted = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, isDeleted)];
                }
            });
        });
    };
    ContestBusiness.prototype.fetchRunningContest = function (contests) {
        return __awaiter(this, void 0, void 0, function () {
            var contestList, _i, contests_1, item, contestEntries, contestObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contestList = [];
                        _i = 0, contests_1 = contests;
                        _a.label = 1;
                    case 1:
                        if (!(_i < contests_1.length)) return [3 /*break*/, 4];
                        item = contests_1[_i];
                        return [4 /*yield*/, this._contestEntryRepository.fetch({
                                contest: item._id,
                            })];
                    case 2:
                        contestEntries = _a.sent();
                        contestObj = {
                            _id: item._id,
                            title: item.title,
                            entryCount: contestEntries.length || 0,
                            viewCount: item.views,
                            bannerImage: item.bannerImage || "",
                            endDate: item.endDate,
                        };
                        contestList = contestList.concat([contestObj]);
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        contestList = contestList.sort(function (a, b) {
                            return lib_1.getTime(b.endDate) - lib_1.getTime(a.endDate);
                        });
                        return [2 /*return*/, contestList];
                }
            });
        });
    };
    return ContestBusiness;
}());
Object.seal(ContestBusiness);
module.exports = ContestBusiness;
//# sourceMappingURL=ContestBusiness.js.map
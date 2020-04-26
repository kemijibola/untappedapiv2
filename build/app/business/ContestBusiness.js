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
var ContestRepository_1 = __importDefault(require("../repository/ContestRepository"));
var ContestEntryRepository_1 = __importDefault(require("../repository/ContestEntryRepository"));
var interfaces_1 = require("../models/interfaces");
var Result_1 = require("../../utils/Result");
var lib_1 = require("../../utils/lib");
var ContestBusiness = /** @class */ (function () {
    function ContestBusiness() {
        this._contestRepository = new ContestRepository_1.default();
        this._contestEntryRepository = new ContestEntryRepository_1.default();
    }
    ContestBusiness.prototype.fetch = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var contests;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._contestRepository.fetch(condition)];
                    case 1:
                        contests = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, contests)];
                }
            });
        });
    };
    ContestBusiness.prototype.fetchContestList = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var contests, modified;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._contestRepository.fetch(condition)];
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
                            return [2 /*return*/, Result_1.Result.fail(400, "Contest with title " + item.title + " already exist")];
                        }
                        item.views = 0;
                        item.likes = 0;
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
                        return [4 /*yield*/, this._contestRepository.update(contest._id, item)];
                    case 2:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
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
            var contestList, currentDate, currentContests, _i, currentContests_1, item, contestEntries, contestObj, earlierContests, _a, earlierContests_1, item, contestEntries, contestObj;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        contestList = [];
                        currentDate = new Date();
                        currentContests = contests
                            .filter(function (x) { return x.startDate >= currentDate; })
                            .sort(function (a, b) {
                            return lib_1.getTime(a.createdAt) - lib_1.getTime(b.createdAt);
                        });
                        _i = 0, currentContests_1 = currentContests;
                        _b.label = 1;
                    case 1:
                        if (!(_i < currentContests_1.length)) return [3 /*break*/, 4];
                        item = currentContests_1[_i];
                        return [4 /*yield*/, this._contestEntryRepository.fetch({
                                contest: item._id,
                            })];
                    case 2:
                        contestEntries = _b.sent();
                        contestObj = {
                            _id: item._id,
                            title: item.title,
                            entryCount: contestEntries.length || 0,
                            viewCount: item.views,
                            bannerImage: item.bannerImage,
                        };
                        contestList = contestList.concat([contestObj]);
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        contestList = contestList.sort(function (a, b) {
                            return b.entryCount - a.entryCount;
                        });
                        earlierContests = contests
                            .filter(function (x) { return x.startDate < currentDate; })
                            .sort(function (a, b) {
                            return lib_1.getTime(b.startDate) - lib_1.getTime(a.startDate);
                        });
                        _a = 0, earlierContests_1 = earlierContests;
                        _b.label = 5;
                    case 5:
                        if (!(_a < earlierContests_1.length)) return [3 /*break*/, 8];
                        item = earlierContests_1[_a];
                        return [4 /*yield*/, this._contestEntryRepository.fetch({
                                contest: item._id,
                            })];
                    case 6:
                        contestEntries = _b.sent();
                        contestObj = {
                            _id: item._id,
                            title: item.title,
                            entryCount: contestEntries.length || 0,
                            viewCount: item.views,
                            bannerImage: item.bannerImage,
                        };
                        contestList = contestList.concat([contestObj]);
                        _b.label = 7;
                    case 7:
                        _a++;
                        return [3 /*break*/, 5];
                    case 8: return [2 /*return*/, contestList];
                }
            });
        });
    };
    return ContestBusiness;
}());
Object.seal(ContestBusiness);
module.exports = ContestBusiness;
//# sourceMappingURL=ContestBusiness.js.map
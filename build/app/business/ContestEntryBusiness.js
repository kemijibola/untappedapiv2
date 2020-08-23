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
var ContestEntryRepository_1 = __importDefault(require("../repository/ContestEntryRepository"));
var ContestRepository_1 = __importDefault(require("../repository/ContestRepository"));
var ProfileRepository_1 = __importDefault(require("../repository/ProfileRepository"));
var UserRepository_1 = __importDefault(require("../repository/UserRepository"));
var UserTypeRepository_1 = __importDefault(require("../repository/UserTypeRepository"));
var CommentRepository_1 = __importDefault(require("../repository/CommentRepository"));
var interfaces_1 = require("../models/interfaces");
var Result_1 = require("../../utils/Result");
var lib_1 = require("../../utils/lib");
var ContestBusiness = /** @class */ (function () {
    function ContestBusiness() {
        this._contestEntryRepository = new ContestEntryRepository_1.default();
        this._contestRepository = new ContestRepository_1.default();
        this._userRepository = new UserRepository_1.default();
        this._profileRepository = new ProfileRepository_1.default();
        this._userTypeRepository = new UserTypeRepository_1.default();
        this._commentRepository = new CommentRepository_1.default();
    }
    ContestBusiness.prototype.fetch = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var contestEntries;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._contestEntryRepository.fetch(condition)];
                    case 1:
                        contestEntries = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, contestEntries)];
                }
            });
        });
    };
    ContestBusiness.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var contestEntry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request.")];
                        return [4 /*yield*/, this._contestEntryRepository.findById(id)];
                    case 1:
                        contestEntry = _a.sent();
                        if (!contestEntry)
                            return [2 /*return*/, Result_1.Result.fail(404, "Competition entry not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, contestEntry)];
                }
            });
        });
    };
    ContestBusiness.prototype.findOne = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var contestEntry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!condition)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request.")];
                        return [4 /*yield*/, this._contestEntryRepository.findByOne(condition)];
                    case 1:
                        contestEntry = _a.sent();
                        if (!contestEntry)
                            return [2 /*return*/, Result_1.Result.fail(404, "Competition entry not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, contestEntry)];
                }
            });
        });
    };
    ContestBusiness.prototype.findByCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var contestEntry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._contestEntryRepository.findByCriteria(criteria)];
                    case 1:
                        contestEntry = _a.sent();
                        if (!contestEntry)
                            return [2 /*return*/, Result_1.Result.fail(404, "Competition entry not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, contestEntry)];
                }
            });
        });
    };
    ContestBusiness.prototype.checkUserEligibility = function (contestId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var eligibleCategoriesMap, eligibilityData, contest, contestantProfile, contestant, userType, alreadyVoted, eligibleCategories, contestantCategories, _i, eligibleCategories_1, item, talentIsEligible;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eligibleCategoriesMap = {};
                        eligibilityData = {
                            status: true,
                            eligibility: interfaces_1.EligibilityStatus.eligible,
                            message: "",
                        };
                        return [4 /*yield*/, this._contestRepository.findById(contestId)];
                    case 1:
                        contest = _a.sent();
                        if (!contest)
                            Result_1.Result.fail(404, "Competition entry not found");
                        return [4 /*yield*/, this._profileRepository.findByCriteria({
                                user: userId,
                            })];
                    case 2:
                        contestantProfile = _a.sent();
                        if (!contestantProfile)
                            Result_1.Result.fail(404, "Contestant profile not found");
                        return [4 /*yield*/, this._userRepository.findById(userId)];
                    case 3:
                        contestant = _a.sent();
                        return [4 /*yield*/, this._userTypeRepository.findByCriteria({
                                name: "Talent",
                            })];
                    case 4:
                        userType = _a.sent();
                        if (contestant.userType != userType._id.toString()) {
                            eligibilityData.status = false;
                            eligibilityData.eligibility = interfaces_1.EligibilityStatus.noteligible;
                            eligibilityData.message = "User is not registered as a Talent";
                            return [2 /*return*/, Result_1.Result.ok(200, eligibilityData)];
                        }
                        return [4 /*yield*/, this._contestEntryRepository.findByCriteria({
                                user: contestant._id,
                                contest: contest._id,
                            })];
                    case 5:
                        alreadyVoted = _a.sent();
                        if (alreadyVoted) {
                            eligibilityData.status = false;
                            eligibilityData.eligibility = interfaces_1.EligibilityStatus.entered;
                            eligibilityData.message = "User already entered contest.";
                            return [2 /*return*/, Result_1.Result.ok(200, eligibilityData)];
                        }
                        eligibleCategories = contest.eligibleCategories;
                        if (eligibleCategories.length > 0) {
                            contestantCategories = contestantProfile.categoryTypes || [];
                            for (_i = 0, eligibleCategories_1 = eligibleCategories; _i < eligibleCategories_1.length; _i++) {
                                item = eligibleCategories_1[_i];
                                if (!eligibleCategoriesMap[item]) {
                                    eligibleCategoriesMap[item] = item;
                                }
                            }
                            talentIsEligible = this.checkIfTalentCategoryEligibility(contestantCategories, eligibleCategoriesMap);
                            if (!talentIsEligible) {
                                eligibilityData.status = false;
                                eligibilityData.eligibility = interfaces_1.EligibilityStatus.noteligible;
                                eligibilityData.message = "Contestant is not eligible.";
                            }
                        }
                        return [2 /*return*/, Result_1.Result.ok(200, eligibilityData)];
                }
            });
        });
    };
    ContestBusiness.prototype.checkIfTalentCategoryEligibility = function (talentCategories, contestCategory) {
        for (var _i = 0, talentCategories_1 = talentCategories; _i < talentCategories_1.length; _i++) {
            var talentCategory = talentCategories_1[_i];
            if (contestCategory[talentCategory]) {
                return true;
            }
        }
        return false;
    };
    ContestBusiness.prototype.fetchContestEntryListByUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var totalCommentCount, contestEntryCommentCountMap, userContestResults, userContestEntries, _i, userContestEntries_1, item, contestEntries, entryComment, userContestResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        totalCommentCount = 0;
                        contestEntryCommentCountMap = {};
                        userContestResults = [];
                        return [4 /*yield*/, this._contestEntryRepository.fetchContestEntryWithContest({
                                user: userId,
                                approved: true,
                            })];
                    case 1:
                        userContestEntries = _a.sent();
                        contestEntryCommentCountMap["totalCommentCount"] = 0;
                        _i = 0, userContestEntries_1 = userContestEntries;
                        _a.label = 2;
                    case 2:
                        if (!(_i < userContestEntries_1.length)) return [3 /*break*/, 6];
                        item = userContestEntries_1[_i];
                        return [4 /*yield*/, this._contestEntryRepository.fetch({
                                contest: item.contest,
                            })];
                    case 3:
                        contestEntries = _a.sent();
                        return [4 /*yield*/, this._commentRepository.fetch({
                                entity: item._id,
                            })];
                    case 4:
                        entryComment = _a.sent();
                        contestEntryCommentCountMap["totalCommentCount"] =
                            contestEntryCommentCountMap["totalCommentCount"] + entryComment.length;
                        userContestResult = {
                            contestId: item._id,
                            contestTitle: item.title,
                            contestBanner: item.contest.bannerImage || "",
                            contestViewCount: item.contest.views || 0,
                            contestLikedByCount: item.contest.likedBy.length || 0,
                            entryCount: contestEntries.length,
                            commentCount: contestEntryCommentCountMap["totalCommentCount"],
                        };
                        userContestResults = userContestResults.concat([userContestResult]);
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/, Result_1.Result.ok(200, userContestResults)];
                }
            });
        });
    };
    // async updateEntryPosition(
    //   item: CreateEntryPosition
    // ): Promise<Result<IContestEntry[]>> {
    //   const contest = await this._contestRepository.findById(item.contestId);
    //   if (!contest) return Result.fail<IContestEntry[]>(404, "Contest not found");
    //   if (isFuture(contest.endDate))
    //     return Result.fail<IContestEntry[]>(400, "Contest still ongoing");
    //   for (let data of item.positions) {
    //     const contestantEntry = await this._contestEntryRepository.findByOne({
    //       _id: data.entryId,
    //     });
    //     if (!contestantEntry)
    //       return Result.fail<IContestEntry[]>(404, "Contestant entry not found");
    //   }
    //   if (contest.redeemable.length !== item.positions.length) {
    //     const winner = contest.redeemable.length > 1 ? "Winners" : "Winner";
    //     return Result.fail<IContestEntry[]>(
    //       400,
    //       `Contest ${contest.title} must have ${contest.redeemable.length} ${winner}`
    //     );
    //   }
    //   var contestEntries: IContestEntry[] = [];
    //   for (let data of item.positions) {
    //     const updateObj = await this._contestEntryRepository.patch(data.entryId, {
    //       position: data.position,
    //     });
    //     contestEntries = [...contestEntries, updateObj];
    //   }
    //   contest.positionsAssigned = true;
    //   await contest.save();
    //   return Result.ok<IContestEntry[]>(200, contestEntries);
    // }
    ContestBusiness.prototype.rejectContestEntry = function (entryId, rejectedBy, rejectionReason) {
        return __awaiter(this, void 0, void 0, function () {
            var contestEntry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._contestEntryRepository.findById(entryId)];
                    case 1:
                        contestEntry = _a.sent();
                        if (!contestEntry)
                            return [2 /*return*/, Result_1.Result.fail(404, "Competition entry not found")];
                        return [4 /*yield*/, this._contestEntryRepository.patch(contestEntry._id, {
                                approved: false,
                                approvedBy: rejectedBy,
                                rejectionReason: rejectionReason,
                                approvedDate: new Date(),
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, true)];
                }
            });
        });
    };
    ContestBusiness.prototype.approveContestEntry = function (entryId, approvedBy) {
        return __awaiter(this, void 0, void 0, function () {
            var contestEntry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._contestEntryRepository.findById(entryId)];
                    case 1:
                        contestEntry = _a.sent();
                        if (!contestEntry)
                            return [2 /*return*/, Result_1.Result.fail(404, "Competition entry not found")];
                        return [4 /*yield*/, this._contestEntryRepository.patch(contestEntry._id, {
                                approved: true,
                                approvedBy: approvedBy,
                                approvedDate: new Date(),
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, true)];
                }
            });
        });
    };
    ContestBusiness.prototype.fetchContestEntries = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._contestEntryRepository.fetchWithUserDetails(condition)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ContestBusiness.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var contest, contestant, alreadyVoted, userType, codeHasBeenAssigned, contestantCode, contestCode, newContestEntry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._contestRepository.findById(item.contest)];
                    case 1:
                        contest = _a.sent();
                        return [4 /*yield*/, this._userRepository.findById(item.user)];
                    case 2:
                        contestant = _a.sent();
                        if (!contestant)
                            return [2 /*return*/, Result_1.Result.fail(404, "Contestant not found")];
                        if (!contestant.isProfileCompleted)
                            return [2 /*return*/, Result_1.Result.fail(400, "Please complete your profile before proceeding")];
                        return [4 /*yield*/, this._contestRepository.findByCriteria({
                                user: contestant._id,
                                contest: contest._id,
                            })];
                    case 3:
                        alreadyVoted = _a.sent();
                        if (alreadyVoted) {
                            Result_1.Result.fail(409, "Contestant has already entered competition.");
                        }
                        return [4 /*yield*/, this._userTypeRepository.findByCriteria({
                                name: "Talent",
                            })];
                    case 4:
                        userType = _a.sent();
                        if (contestant.userType != userType._id.toString())
                            return [2 /*return*/, Result_1.Result.fail(400, "User is not registered as a Talent")];
                        codeHasBeenAssigned = true;
                        if (!contest)
                            return [2 /*return*/, Result_1.Result.fail(404, "Competition not found")];
                        contestantCode = "";
                        _a.label = 5;
                    case 5:
                        if (!codeHasBeenAssigned) return [3 /*break*/, 7];
                        contestantCode = ("" + contestant.fullName.substring(0, 2) + lib_1.generateRandomNumber(2)).toUpperCase();
                        return [4 /*yield*/, this._contestEntryRepository.findByCriteria({
                                contest: contest._id,
                                contestantCode: contestantCode,
                            })];
                    case 6:
                        contestCode = _a.sent();
                        if (contestCode)
                            codeHasBeenAssigned = true;
                        else
                            codeHasBeenAssigned = false;
                        return [3 /*break*/, 5];
                    case 7:
                        item.contestantCode = contestantCode;
                        item.position = interfaces_1.EntryPosition.participant;
                        item.approved = false;
                        return [4 /*yield*/, this._contestEntryRepository.create(item)];
                    case 8:
                        newContestEntry = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(201, newContestEntry)];
                }
            });
        });
    };
    ContestBusiness.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var contestEntry, updateObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._contestEntryRepository.findById(id)];
                    case 1:
                        contestEntry = _a.sent();
                        if (!contestEntry)
                            return [2 /*return*/, Result_1.Result.fail(404, "Competition entry not found")];
                        return [4 /*yield*/, this._contestEntryRepository.update(contestEntry._id, item)];
                    case 2:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                }
            });
        });
    };
    ContestBusiness.prototype.patch = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var contestEntry, updateObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._contestEntryRepository.findById(id)];
                    case 1:
                        contestEntry = _a.sent();
                        if (!contestEntry)
                            return [2 /*return*/, Result_1.Result.fail(404, "Competition entry not found")];
                        return [4 /*yield*/, this._contestEntryRepository.update(contestEntry._id, item)];
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
                    case 0: return [4 /*yield*/, this._contestEntryRepository.delete(id)];
                    case 1:
                        isDeleted = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, isDeleted)];
                }
            });
        });
    };
    return ContestBusiness;
}());
Object.seal(ContestBusiness);
module.exports = ContestBusiness;
//# sourceMappingURL=ContestEntryBusiness.js.map
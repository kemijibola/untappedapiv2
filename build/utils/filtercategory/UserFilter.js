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
Object.defineProperty(exports, "__esModule", { value: true });
var viewmodels_1 = require("../../app/models/viewmodels");
var MatchData_1 = require("./Helper/MatchData");
var UserTypeBusiness = require("../../app/business/UserTypeBusiness");
var interfaces_1 = require("../../app/models/interfaces");
var UserBusiness = require("../../app/business/UserBusiness");
var CategoryTypeBusiness = require("../../app/business/CategoryTypeBusiness");
var ProfileBusiness = require("../../app/business/ProfileBusiness");
var ProfessionalPortfolio_1 = require("../../utils/filtercategory/ProfessionalPortfolio");
var ContestBusiness = require("../../app/business/ContestBusiness");
var UserFilter = /** @class */ (function () {
    function UserFilter() {
        var _this = this;
        this.fetchTalents = function (condition) { return __awaiter(_this, void 0, void 0, function () {
            var userTypeBusiness, result, talents, users, profileBusiness, _i, talents_1, x, userProfile, categoryTypes, _a, user, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 11, , 12]);
                        userTypeBusiness = new UserTypeBusiness();
                        return [4 /*yield*/, userTypeBusiness.findByCriteria({
                                name: viewmodels_1.AppUsers.Talent,
                            })];
                    case 1:
                        result = _b.sent();
                        if (!result.data) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.fetchUsers({
                                userType: result.data._id,
                                isProfileCompleted: true,
                                status: interfaces_1.AccountStatus.ACTIVATED,
                            })];
                    case 2:
                        talents = _b.sent();
                        users = [];
                        if (!(talents.length > 0)) return [3 /*break*/, 9];
                        profileBusiness = new ProfileBusiness();
                        _i = 0, talents_1 = talents;
                        _b.label = 3;
                    case 3:
                        if (!(_i < talents_1.length)) return [3 /*break*/, 9];
                        x = talents_1[_i];
                        return [4 /*yield*/, profileBusiness.findByUser(x._id)];
                    case 4:
                        userProfile = _b.sent();
                        if (!userProfile.data) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.transformCategoryType(userProfile.data.categoryTypes)];
                    case 5:
                        _a = _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        _a = [];
                        _b.label = 7;
                    case 7:
                        categoryTypes = _a;
                        user = {
                            user: x._id,
                            userType: x.userType,
                            stageName: userProfile.data ? userProfile.data.name : "",
                            displayPhoto: x.profileImagePath || "",
                            displayName: x.fullName,
                            location: userProfile.data ? userProfile.data.location : "",
                            categoryTypes: categoryTypes,
                            tapCount: userProfile.data ? userProfile.data.tappedBy.length : 0,
                            tappedBy: userProfile.data ? userProfile.data.tappedBy.slice() : [],
                            shortDescription: userProfile.data
                                ? userProfile.data.shortBio
                                : "",
                            dateJoined: x.createdAt,
                        };
                        users = users.concat([user]);
                        _b.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 3];
                    case 9:
                        MatchData_1.generateTalentReport(users);
                        _b.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        err_1 = _b.sent();
                        console.log(err_1);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        }); };
        this.transformCategoryType = function (categories) { return __awaiter(_this, void 0, void 0, function () {
            var categoryTypeBusiness, transformed, _i, categories_1, item, found;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        categoryTypeBusiness = new CategoryTypeBusiness();
                        transformed = [];
                        _i = 0, categories_1 = categories;
                        _a.label = 1;
                    case 1:
                        if (!(_i < categories_1.length)) return [3 /*break*/, 4];
                        item = categories_1[_i];
                        return [4 /*yield*/, categoryTypeBusiness.findById(item)];
                    case 2:
                        found = _a.sent();
                        if (found.data)
                            transformed.push({
                                categoryTypeId: found.data._id,
                                categoryTypeName: found.data.name,
                                category: found.data.category,
                            });
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, transformed];
                }
            });
        }); };
        this.fetchProfessionals = function (condition) { return __awaiter(_this, void 0, void 0, function () {
            var userTypeBusiness, contestBusiness, result, professionals, users, profileBusiness, _i, professionals_1, x, userProfile, professionalSetUp, userContests, categoryTypes, _a, userSocial, user, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 12, , 13]);
                        userTypeBusiness = new UserTypeBusiness();
                        contestBusiness = new ContestBusiness();
                        return [4 /*yield*/, userTypeBusiness.findByCriteria({
                                name: viewmodels_1.AppUsers.Professional,
                            })];
                    case 1:
                        result = _b.sent();
                        if (!result.data) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.fetchUsers({
                                userType: result.data._id,
                                isEmailConfirmed: true,
                                status: interfaces_1.AccountStatus.ACTIVATED,
                            })];
                    case 2:
                        professionals = _b.sent();
                        users = [];
                        if (!(professionals.length > 0)) return [3 /*break*/, 10];
                        profileBusiness = new ProfileBusiness();
                        _i = 0, professionals_1 = professionals;
                        _b.label = 3;
                    case 3:
                        if (!(_i < professionals_1.length)) return [3 /*break*/, 10];
                        x = professionals_1[_i];
                        return [4 /*yield*/, profileBusiness.findByUser(x._id)];
                    case 4:
                        userProfile = _b.sent();
                        professionalSetUp = ProfessionalPortfolio_1.ProfessionalPortfolio.setUp(x._id);
                        return [4 /*yield*/, professionalSetUp.fetchContestListByUser()];
                    case 5:
                        userContests = _b.sent();
                        if (!userProfile.data) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.transformCategoryType(userProfile.data.categoryTypes)];
                    case 6:
                        _a = _b.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        _a = [];
                        _b.label = 8;
                    case 8:
                        categoryTypes = _a;
                        userSocial = [];
                        if (userProfile.data) {
                            if (userProfile.data.facebook)
                                userSocial = userSocial.concat([
                                    {
                                        type: interfaces_1.SocialMediaTypes.facebook,
                                        handle: userProfile.data.facebook,
                                    },
                                ]);
                            if (userProfile.data.instagram)
                                userSocial = userSocial.concat([
                                    {
                                        type: interfaces_1.SocialMediaTypes.instagram,
                                        handle: userProfile.data.instagram,
                                    },
                                ]);
                            if (userProfile.data.youtube)
                                userSocial = userSocial.concat([
                                    {
                                        type: interfaces_1.SocialMediaTypes.youtube,
                                        handle: userProfile.data.youtube,
                                    },
                                ]);
                            if (userProfile.data.twitter)
                                userSocial = userSocial.concat([
                                    {
                                        type: interfaces_1.SocialMediaTypes.twitter,
                                        handle: userProfile.data.twitter,
                                    },
                                ]);
                            user = {
                                user: x._id,
                                userType: x.userType,
                                businessName: userProfile.data.name,
                                userSocials: userSocial.slice(),
                                displayPhoto: x.profileImagePath || "",
                                displayName: x.fullName,
                                bannerPhoto: x.bannerImagePath || "",
                                location: userProfile.data.location || "",
                                categoryTypes: categoryTypes,
                                shortDescription: userProfile.data.shortBio || "",
                                dateJoined: x.createdAt,
                                contestCount: userContests.length,
                                contests: userContests.slice(),
                            };
                            users = users.concat([user]);
                        }
                        _b.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 3];
                    case 10:
                        MatchData_1.generateProfessionalReport(users);
                        _b.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        err_2 = _b.sent();
                        console.log(err_2);
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        }); };
        this.fetchUsers = function (condition) { return __awaiter(_this, void 0, void 0, function () {
            var userBusiness, usersModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userBusiness = new UserBusiness();
                        return [4 /*yield*/, userBusiness.fetch(condition)];
                    case 1:
                        usersModel = _a.sent();
                        return [2 /*return*/, usersModel.data ? usersModel.data : []];
                }
            });
        }); };
    }
    UserFilter.initReport = function () {
        return new UserFilter();
    };
    UserFilter.prototype.generateReport = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.fetchTalents({})];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.fetchProfessionals({})];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        // log error
                        console.log(err_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserFilter;
}());
exports.UserFilter = UserFilter;
//# sourceMappingURL=UserFilter.js.map
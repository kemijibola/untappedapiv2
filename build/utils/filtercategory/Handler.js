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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var MatchData_1 = require("./Helper/MatchData");
var viewmodels_1 = require("../../app/models/viewmodels");
var interfaces_1 = require("../../app/models/interfaces");
var UserBusiness = require("../../app/business/UserBusiness");
var UserTypeBusiness = require("../../app/business/UserTypeBusiness");
var ProfileBusiness = require("../../app/business/ProfileBusiness");
var ProfessionalPortfolio_1 = require("./ProfessionalPortfolio");
exports.fetchTalentsByCategory = function (event, context, cb) { return __awaiter(_this, void 0, void 0, function () {
    var userTypeBusiness, talentsResult, talents, professionalResult, professionals, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                userTypeBusiness = new UserTypeBusiness();
                return [4 /*yield*/, userTypeBusiness.findByCriteria({
                        name: viewmodels_1.AppUsers.Talent
                    })];
            case 1:
                talentsResult = _a.sent();
                console.log("users from handler");
                if (!talentsResult.data) return [3 /*break*/, 3];
                return [4 /*yield*/, exports.fetchUsers({ userType: talentsResult.data._id })];
            case 2:
                talents = _a.sent();
                MatchData_1.generateTalentReport(talents);
                _a.label = 3;
            case 3: return [4 /*yield*/, userTypeBusiness.findByCriteria({
                    name: viewmodels_1.AppUsers.Professional
                })];
            case 4:
                professionalResult = _a.sent();
                if (!professionalResult.data) return [3 /*break*/, 6];
                return [4 /*yield*/, exports.fetchUsers({
                        userType: professionalResult.data._id
                    })];
            case 5:
                professionals = _a.sent();
                MatchData_1.generateProfessionalReport(professionals);
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                err_1 = _a.sent();
                // do nothing
                console.log(err_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.fetchUsers = function (condition) { return __awaiter(_this, void 0, void 0, function () {
    var users, userBusiness, profileBusiness, usersModel, _i, _a, x, userProfile, professionalSetUp, userContest, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                condition.isEmailConfirmed = true;
                condition.isProfileCompleted = true;
                condition.status = interfaces_1.AccountStatus.ACTIVATED;
                users = [];
                userBusiness = new UserBusiness();
                profileBusiness = new ProfileBusiness();
                return [4 /*yield*/, userBusiness.fetch(condition)];
            case 1:
                usersModel = _b.sent();
                console.log("users from handler", usersModel);
                if (!usersModel.data) return [3 /*break*/, 6];
                _i = 0, _a = usersModel.data;
                _b.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 6];
                x = _a[_i];
                return [4 /*yield*/, profileBusiness.findByUser(x._id)];
            case 3:
                userProfile = _b.sent();
                professionalSetUp = ProfessionalPortfolio_1.ProfessionalPortfolio.setUp(x._id);
                return [4 /*yield*/, professionalSetUp.fetchProfessionalContests()];
            case 4:
                userContest = _b.sent();
                user = {
                    user: x._id,
                    userType: x.userType,
                    displayPhoto: x.profileImagePath || "",
                    displayName: x.fullName,
                    categories: userProfile.data ? userProfile.data.categories : [],
                    tapCount: userProfile.data ? userProfile.data.tapCount : 0,
                    shortDescription: userProfile.data ? userProfile.data.shortBio : "",
                    createdAt: x.createdAt,
                    contestCount: userContest.length
                };
                users = users.concat([user]);
                _b.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6: return [2 /*return*/, users];
        }
    });
}); };
//# sourceMappingURL=Handler.js.map
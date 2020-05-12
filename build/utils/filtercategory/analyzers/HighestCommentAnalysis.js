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
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("../../../app/models/interfaces");
var CommentBusiness_1 = __importDefault(require("../../../app/business/CommentBusiness"));
var TalentPortfolio_1 = require("../TalentPortfolio");
var HighestCommentAnalysis = /** @class */ (function () {
    function HighestCommentAnalysis() {
        this.talentPortfolio = [];
        this.talentMediaComment = [];
    }
    HighestCommentAnalysis.prototype.run = function (users) {
        return __awaiter(this, void 0, void 0, function () {
            var filteredCategories, talentMediaCommentMap, talentMedia, _i, users_1, item, talentMedia_1, _loop_1, this_1, userMedias, talent, _a, _b, _c, key, _d, _e, talentMediaComment, filtered;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        filteredCategories = [];
                        talentMediaCommentMap = {};
                        talentMedia = [];
                        _i = 0, users_1 = users;
                        _f.label = 1;
                    case 1:
                        if (!(_i < users_1.length)) return [3 /*break*/, 4];
                        item = users_1[_i];
                        return [4 /*yield*/, this.fetchTalentMedia(item.user)];
                    case 2:
                        talentMedia_1 = _f.sent();
                        if (talentMedia_1.length > 0) {
                            talentMediaCommentMap[item.user] = talentMedia_1;
                        }
                        _f.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        _loop_1 = function (key) {
                            var mediaCounter, _i, userMedias_1, media, mediaComment, mediaCount;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        mediaCounter = 0;
                                        userMedias = talentMediaCommentMap[key];
                                        _i = 0, userMedias_1 = userMedias;
                                        _a.label = 1;
                                    case 1:
                                        if (!(_i < userMedias_1.length)) return [3 /*break*/, 4];
                                        media = userMedias_1[_i];
                                        return [4 /*yield*/, this_1.fetchTalentMediaComments(media._id)];
                                    case 2:
                                        mediaComment = _a.sent();
                                        mediaCount = mediaComment.length > 0 ? mediaComment.length : 0;
                                        mediaCounter = mediaCounter + mediaCount;
                                        _a.label = 3;
                                    case 3:
                                        _i++;
                                        return [3 /*break*/, 1];
                                    case 4:
                                        talent = users.filter(function (x) { return x.user == key; })[0];
                                        this_1.talentMediaComment.push({
                                            count: mediaCounter,
                                            talent: talent,
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a = [];
                        for (_b in talentMediaCommentMap)
                            _a.push(_b);
                        _c = 0;
                        _f.label = 5;
                    case 5:
                        if (!(_c < _a.length)) return [3 /*break*/, 8];
                        key = _a[_c];
                        return [5 /*yield**/, _loop_1(key)];
                    case 6:
                        _f.sent();
                        _f.label = 7;
                    case 7:
                        _c++;
                        return [3 /*break*/, 5];
                    case 8:
                        this.talentMediaComment = this.talentMediaComment.sort(function (a, b) {
                            return b.count - a.count;
                        });
                        for (_d = 0, _e = this.talentMediaComment; _d < _e.length; _d++) {
                            talentMediaComment = _e[_d];
                            filtered = Object.assign({
                                user: talentMediaComment.talent.user,
                                displayName: talentMediaComment.talent.displayName,
                                tapCount: talentMediaComment.talent.tapCount,
                                aliasName: talentMediaComment.talent.stageName,
                                location: talentMediaComment.talent.location,
                                dateJoined: talentMediaComment.talent.dateJoined,
                                displayPhoto: talentMediaComment.talent.displayPhoto,
                                shortDescription: talentMediaComment.talent.shortDescription || "",
                                categoryTypes: talentMediaComment.talent.categoryTypes || [],
                                reportType: interfaces_1.ReportType.highestcomment,
                                userType: talentMediaComment.talent.userType,
                            });
                            filteredCategories = filteredCategories.concat([filtered]);
                        }
                        return [2 /*return*/, filteredCategories];
                }
            });
        });
    };
    HighestCommentAnalysis.prototype.fetchTalentMedia = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var medias, talentPortfolio, allMedia, userAudios, userImages, userVideos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        medias = [];
                        talentPortfolio = TalentPortfolio_1.TalentPortfolio.setUp(userId);
                        return [4 /*yield*/, talentPortfolio.fetchTalentMedia()];
                    case 1:
                        allMedia = _a.sent();
                        userAudios = allMedia.filter(function (x) { return x.mediaType === interfaces_1.MediaType.audio; });
                        medias = medias.concat(userAudios);
                        userImages = allMedia.filter(function (x) { return x.mediaType === interfaces_1.MediaType.image; });
                        medias = medias.concat(userImages);
                        userVideos = allMedia.filter(function (x) { return x.mediaType === interfaces_1.MediaType.video; });
                        medias = medias.concat(userVideos);
                        return [2 /*return*/, medias];
                }
            });
        });
    };
    HighestCommentAnalysis.prototype.fetchTalentMediaComments = function (mediaId) {
        return __awaiter(this, void 0, void 0, function () {
            var commentBusiness, comments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        commentBusiness = new CommentBusiness_1.default();
                        return [4 /*yield*/, commentBusiness.fetch({ entityId: mediaId })];
                    case 1:
                        comments = _a.sent();
                        return [2 /*return*/, comments.data ? comments.data : []];
                }
            });
        });
    };
    return HighestCommentAnalysis;
}());
exports.HighestCommentAnalysis = HighestCommentAnalysis;
//# sourceMappingURL=HighestCommentAnalysis.js.map
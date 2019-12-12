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
    }
    HighestCommentAnalysis.prototype.run = function (talents) {
        var _this = this;
        var sortedCategory = {
            result: [],
            categoryType: interfaces_1.ReportType.HighestComments
        };
        var talentsMedia = talents.reduce(function (acc, theItem) {
            _this.fetchTalentMedia(theItem._id).then(function (data) {
                acc.push({
                    medias: data,
                    profile: theItem
                });
            });
            return acc;
        }, []);
        // fetch talent's media
        var talentsMediaComment = [];
        var _loop_1 = function (talentMedia) {
            var mediasCount = 0;
            for (var _i = 0, _a = talentMedia.medias; _i < _a.length; _i++) {
                var media = _a[_i];
                this_1.fetchTalentMediaComments(media._id).then(function (data) {
                    mediasCount += data.length - 1;
                });
                talentsMediaComment.push({
                    count: mediasCount,
                    profile: talentMedia.profile
                });
            }
        };
        var this_1 = this;
        for (var _i = 0, talentsMedia_1 = talentsMedia; _i < talentsMedia_1.length; _i++) {
            var talentMedia = talentsMedia_1[_i];
            _loop_1(talentMedia);
        }
        talentsMediaComment = talentsMediaComment.sort(function (a, b) {
            return b.count - a.count;
        });
        for (var _a = 0, talentsMediaComment_1 = talentsMediaComment; _a < talentsMediaComment_1.length; _a++) {
            var talentMediaComment = talentsMediaComment_1[_a];
            var filtered = {
                userId: talentMediaComment.profile._id,
                name: talentMediaComment.profile.name || "",
                // profileImage: talentMediaComment.talent.profileImagePath || '',
                profileImage: "",
                shortBio: talentMediaComment.profile.shortBio || ""
            };
            sortedCategory.result = sortedCategory.result.concat([filtered]);
        }
        return sortedCategory;
    };
    HighestCommentAnalysis.prototype.fetchTalentMedia = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var medias, talentPortfolio, audios, videos, images;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        medias = [];
                        talentPortfolio = TalentPortfolio_1.TalentPortfolio.setUp(userId);
                        return [4 /*yield*/, talentPortfolio.fetchTalentAudios()];
                    case 1:
                        audios = _a.sent();
                        medias = medias.concat(audios);
                        return [4 /*yield*/, talentPortfolio.fetchTalentVideos()];
                    case 2:
                        videos = _a.sent();
                        medias = medias.concat(videos);
                        return [4 /*yield*/, talentPortfolio.fetchTalentImages()];
                    case 3:
                        images = _a.sent();
                        medias = medias.concat(images);
                        return [2 /*return*/, medias];
                }
            });
        });
    };
    HighestCommentAnalysis.prototype.fetchTalentMediaComments = function (mediaId) {
        return __awaiter(this, void 0, void 0, function () {
            var mediaComments, commentBusiness, comments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mediaComments = [];
                        commentBusiness = new CommentBusiness_1.default();
                        return [4 /*yield*/, commentBusiness.fetch({ entityId: mediaId })];
                    case 1:
                        comments = _a.sent();
                        if (comments.data) {
                            mediaComments = mediaComments.concat(comments.data);
                        }
                        return [2 /*return*/, mediaComments];
                }
            });
        });
    };
    return HighestCommentAnalysis;
}());
exports.HighestCommentAnalysis = HighestCommentAnalysis;
//# sourceMappingURL=HighestCommentAnalysis.js.map
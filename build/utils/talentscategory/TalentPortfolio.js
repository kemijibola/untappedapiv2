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
var VideoBusiness_1 = __importDefault(require("../../app/business/VideoBusiness"));
var AudioBusiness_1 = __importDefault(require("../../app/business/AudioBusiness"));
var ImageBusiness_1 = __importDefault(require("../../app/business/ImageBusiness"));
var ProfileBusiness_1 = __importDefault(require("../../app/business/ProfileBusiness"));
var TalentPortfolio = /** @class */ (function () {
    function TalentPortfolio(userId) {
        this.userId = userId;
    }
    TalentPortfolio.setUp = function (userId) {
        return new TalentPortfolio(userId);
    };
    TalentPortfolio.prototype.fetchTalentVideos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var videos, videoBusiness, talentVideos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        videos = [];
                        videoBusiness = new VideoBusiness_1.default();
                        return [4 /*yield*/, videoBusiness.fetch({ user: this.userId })];
                    case 1:
                        talentVideos = _a.sent();
                        if (talentVideos.data)
                            videos = videos.concat(talentVideos.data);
                        return [2 /*return*/, videos];
                }
            });
        });
    };
    TalentPortfolio.prototype.fetchTalentAudios = function () {
        return __awaiter(this, void 0, void 0, function () {
            var audios, audioBusiness, talentAudios;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        audios = [];
                        audioBusiness = new AudioBusiness_1.default();
                        return [4 /*yield*/, audioBusiness.fetch({ user: this.userId })];
                    case 1:
                        talentAudios = _a.sent();
                        if (talentAudios.data)
                            audios = audios.concat(talentAudios.data);
                        return [2 /*return*/, audios];
                }
            });
        });
    };
    TalentPortfolio.prototype.fetchTalentImages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var images, imageBusiness, talentImages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        images = [];
                        imageBusiness = new ImageBusiness_1.default();
                        return [4 /*yield*/, imageBusiness.fetch({ user: this.userId })];
                    case 1:
                        talentImages = _a.sent();
                        if (talentImages.data)
                            images = images.concat(talentImages.data);
                        return [2 /*return*/, images];
                }
            });
        });
    };
    TalentPortfolio.prototype.fetchTalents = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var talents, talentBusiness, talentsModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        talents = [];
                        talentBusiness = new ProfileBusiness_1.default();
                        return [4 /*yield*/, talentBusiness.fetch(condition)];
                    case 1:
                        talentsModel = _a.sent();
                        talents = talentsModel.data || [];
                        return [2 /*return*/, talents];
                }
            });
        });
    };
    return TalentPortfolio;
}());
exports.TalentPortfolio = TalentPortfolio;
//# sourceMappingURL=TalentPortfolio.js.map
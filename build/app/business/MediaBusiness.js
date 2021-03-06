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
var Media_1 = require("./../models/interfaces/Media");
var MediaRepository_1 = __importDefault(require("../repository/MediaRepository"));
var Result_1 = require("../../utils/Result");
var MediaBusiness = /** @class */ (function () {
    function MediaBusiness() {
        this._mediaRepository = new MediaRepository_1.default();
    }
    // TODO:: ensure soft delete on all media items: Audio, Image and Video
    MediaBusiness.prototype.fetch = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var medias;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mediaRepository.fetch(condition)];
                    case 1:
                        medias = _a.sent();
                        if (medias) {
                            medias.forEach(function (x) {
                                var mediaItems = x.items.filter(function (y) { return !y.isDeleted && y.isApproved; });
                                if (mediaItems.length > 0)
                                    return x;
                            });
                        }
                        return [2 /*return*/, Result_1.Result.ok(200, medias)];
                }
            });
        });
    };
    MediaBusiness.prototype.fetchMediaPendingApproval = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var mediaPendingApproval, medias, _i, medias_1, media;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mediaPendingApproval = [];
                        return [4 /*yield*/, this._mediaRepository.fetch(condition)];
                    case 1:
                        medias = _a.sent();
                        if (medias) {
                            for (_i = 0, medias_1 = medias; _i < medias_1.length; _i++) {
                                media = medias_1[_i];
                                media.items = media.items.filter(function (x) { return !x.isDeleted && !x.isApproved; });
                                if (media.items.length > 0) {
                                    mediaPendingApproval = mediaPendingApproval.concat([media]);
                                }
                            }
                        }
                        return [2 /*return*/, Result_1.Result.ok(200, mediaPendingApproval)];
                }
            });
        });
    };
    MediaBusiness.prototype.fetchTalentPortfolioPreview = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var portfolioPreviews, modified;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mediaRepository.fetchWithUser(condition)];
                    case 1:
                        portfolioPreviews = _a.sent();
                        modified = [];
                        if (portfolioPreviews) {
                            modified = portfolioPreviews.reduce(function (theMap, theItem) {
                                var items = theItem.items.filter(function (x) { return !x.isDeleted && x.isApproved; }).slice();
                                if (items.length > 0) {
                                    theMap.push({
                                        _id: theItem._id,
                                        mediaType: theItem.mediaType,
                                        talent: theItem.user,
                                        aliasName: theItem.user.fullName,
                                        uploadType: theItem.uploadType,
                                        albumCoverKey: theItem.albumCover || "",
                                        defaultImageKey: items.length > 0 ? items[0].path : "",
                                        mediaTitle: theItem.title,
                                        mediaDescription: theItem.shortDescription,
                                        items: items,
                                        itemsCount: items.length,
                                        dateCreated: theItem.createdAt,
                                    });
                                }
                                return theMap;
                            }, []);
                        }
                        return [2 /*return*/, Result_1.Result.ok(200, modified)];
                }
            });
        });
    };
    MediaBusiness.prototype.fetchPreview = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var mediaPreviews, modified;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mediaRepository.fetch(condition)];
                    case 1:
                        mediaPreviews = _a.sent();
                        modified = [];
                        if (mediaPreviews) {
                            modified = mediaPreviews.reduce(function (theMap, theItem) {
                                var items = theItem.items.filter(function (x) { return !x.isDeleted && x.isApproved; }).slice();
                                var albumCover = "";
                                if (items.length > 0) {
                                    if (theItem.mediaType === Media_1.MediaType.video) {
                                        albumCover = theItem.albumCover || "";
                                    }
                                    if (theItem.mediaType === Media_1.MediaType.image) {
                                        albumCover = theItem.items[0].path;
                                    }
                                    theMap.push({
                                        _id: theItem._id,
                                        title: theItem.title,
                                        mediaType: theItem.mediaType,
                                        uploadType: theItem.uploadType,
                                        defaultMediaPath: albumCover || "",
                                        shortDescription: theItem.shortDescription,
                                        itemCount: items.length,
                                    });
                                }
                                return theMap;
                            }, []);
                        }
                        return [2 /*return*/, Result_1.Result.ok(200, modified)];
                }
            });
        });
    };
    MediaBusiness.prototype.findMedia = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var media;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mediaRepository.findByIdCriteria(criteria)];
                    case 1:
                        media = _a.sent();
                        if (!media)
                            return [2 /*return*/, Result_1.Result.fail(404, "Media not found")];
                        media.items = media.items.filter(function (x) { return !x.isDeleted && x.isApproved; });
                        return [2 /*return*/, Result_1.Result.ok(200, media)];
                }
            });
        });
    };
    MediaBusiness.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var criteria, media;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        criteria = {
                            _id: id,
                            isApproved: true,
                            isDeleted: false,
                        };
                        return [4 /*yield*/, this._mediaRepository.findByIdCriteria(criteria)];
                    case 1:
                        media = _a.sent();
                        if (!media)
                            return [2 /*return*/, Result_1.Result.fail(404, "Media not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, media)];
                }
            });
        });
    };
    MediaBusiness.prototype.findOne = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var media;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!condition)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request")];
                        condition.isApproved = true;
                        condition.isDeleted = false;
                        return [4 /*yield*/, this._mediaRepository.findByOne(condition)];
                    case 1:
                        media = _a.sent();
                        if (!media)
                            return [2 /*return*/, Result_1.Result.fail(404, "Media not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, media)];
                }
            });
        });
    };
    MediaBusiness.prototype.findByCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var media;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        criteria.isApproved = true;
                        criteria.isDeleted = false;
                        return [4 /*yield*/, this._mediaRepository.findByCriteria(criteria)];
                    case 1:
                        media = _a.sent();
                        if (!media)
                            return [2 /*return*/, Result_1.Result.fail(404, "Media not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, media)];
                }
            });
        });
    };
    MediaBusiness.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var newMedia;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        item.activityCount = 0;
                        item.isDeleted = false;
                        return [4 /*yield*/, this._mediaRepository.create(item)];
                    case 1:
                        newMedia = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(201, newMedia)];
                }
            });
        });
    };
    MediaBusiness.prototype.rejectMedia = function (mediaId, mediaItemId, rejectedBy, rejectionReason) {
        return __awaiter(this, void 0, void 0, function () {
            var media, modifiedItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mediaRepository.findById(mediaId)];
                    case 1:
                        media = _a.sent();
                        if (!media)
                            return [2 /*return*/, Result_1.Result.fail(404, "Media not found.")];
                        modifiedItems = media.items.reduce(function (theMap, theItem) {
                            if (theItem._id == mediaItemId) {
                                theMap.push(Object.assign({
                                    _id: theItem._id,
                                    path: theItem.path,
                                    likedBy: theItem.likedBy,
                                    createdAt: theItem.createdAt,
                                    updatedAt: theItem.updatedAt,
                                    isApproved: theItem.isApproved,
                                    approvedBy: rejectedBy,
                                    approvedDate: new Date(),
                                    rejectionReason: rejectionReason,
                                }));
                            }
                            else {
                                theMap = theMap.concat([theItem]);
                            }
                            return theMap;
                        }, []);
                        return [4 /*yield*/, this._mediaRepository.patch(media._id, {
                                items: modifiedItems,
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, true)];
                }
            });
        });
    };
    MediaBusiness.prototype.approveMedia = function (mediaId, mediaItemId, approvedBy) {
        return __awaiter(this, void 0, void 0, function () {
            var media, modifiedItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mediaRepository.findById(mediaId)];
                    case 1:
                        media = _a.sent();
                        if (!media)
                            return [2 /*return*/, Result_1.Result.fail(404, "Media not found.")];
                        modifiedItems = media.items.reduce(function (theMap, theItem) {
                            if (theItem._id == mediaItemId) {
                                theMap.push(Object.assign({
                                    _id: theItem._id,
                                    path: theItem.path,
                                    likedBy: theItem.likedBy,
                                    createdAt: theItem.createdAt,
                                    updatedAt: theItem.updatedAt,
                                    isApproved: true,
                                    approvedBy: approvedBy,
                                    approvedDate: new Date(),
                                }));
                            }
                            else {
                                theMap = theMap.concat([theItem]);
                            }
                            return theMap;
                        }, []);
                        return [4 /*yield*/, this._mediaRepository.patch(media._id, {
                                items: modifiedItems,
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, true)];
                }
            });
        });
    };
    MediaBusiness.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var media, updateObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mediaRepository.findById(id)];
                    case 1:
                        media = _a.sent();
                        if (!media)
                            return [2 /*return*/, Result_1.Result.fail(404, "Media not found.")];
                        if (media.user != item.user)
                            return [2 /*return*/, Result_1.Result.fail(403, "You are not authorized to perform this update.")];
                        media._id = media._id;
                        media.title = item.title || media.title;
                        media.shortDescription = item.shortDescription || media.shortDescription;
                        media.user = media.user;
                        media.isDeleted = media.isDeleted;
                        media.createdAt = media.createdAt;
                        media.items = media.items.slice();
                        return [4 /*yield*/, this._mediaRepository.update(media._id, media)];
                    case 2:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                }
            });
        });
    };
    MediaBusiness.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mediaRepository.patch(id, {
                            isDeleted: true,
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, true)];
                }
            });
        });
    };
    MediaBusiness.prototype.updateExistingMedia = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var media, newItems, updatedObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mediaRepository.findById(id)];
                    case 1:
                        media = _a.sent();
                        if (!media)
                            return [2 /*return*/, Result_1.Result.fail(404, "Media not found")];
                        if (media.user != item.user)
                            return [2 /*return*/, Result_1.Result.fail(403, "You are not authorized to perform this update.")];
                        media._id = media._id;
                        media.title = item.title || media.title;
                        media.shortDescription = item.shortDescription || media.shortDescription;
                        media.user = media.user;
                        newItems = item.items.reduce(function (theMap, theItem) {
                            var item = {
                                path: theItem.path,
                                isApproved: false,
                                isDeleted: false,
                            };
                            theMap = theMap.concat([item]);
                            return theMap;
                        }, []);
                        media.items = media.items.concat(newItems);
                        media.uploadType = media.uploadType;
                        media.mediaType = media.mediaType;
                        media.isDeleted = media.isDeleted;
                        media.activityCount = media.activityCount;
                        return [4 /*yield*/, this._mediaRepository.patch(media._id, media)];
                    case 2:
                        updatedObj = _a.sent();
                        updatedObj.items = updatedObj.items.filter(function (x) { return !x.isDeleted && x.isApproved; });
                        return [2 /*return*/, Result_1.Result.ok(200, updatedObj)];
                }
            });
        });
    };
    MediaBusiness.prototype.deleteMediaItem = function (id, itemId) {
        return __awaiter(this, void 0, void 0, function () {
            var media, remainingMediaItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mediaRepository.findById(id)];
                    case 1:
                        media = _a.sent();
                        media.items = media.items.reduce(function (theMap, theItem) {
                            if (theItem._id == itemId) {
                                theMap.push({
                                    _id: theItem._id,
                                    path: theItem.path,
                                    likedBy: theItem.likedBy,
                                    createdAt: theItem.createdAt,
                                    updatedAt: theItem.updatedAt,
                                    isDeleted: true,
                                    isApproved: theItem.isApproved,
                                });
                            }
                            else {
                                theMap.push(theItem);
                            }
                            return theMap;
                        }, []);
                        remainingMediaItems = media.items.filter(function (x) { return !x.isDeleted && x.isApproved; });
                        if (!(remainingMediaItems.length < 1)) return [3 /*break*/, 4];
                        media.isDeleted = true;
                        return [4 /*yield*/, this._mediaRepository.patch(media._id, { items: media.items })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this._mediaRepository.update(media._id, media)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this._mediaRepository.patch(media._id, { items: media.items })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, Result_1.Result.ok(200, true)];
                }
            });
        });
    };
    return MediaBusiness;
}());
Object.seal(MediaBusiness);
module.exports = MediaBusiness;
//# sourceMappingURL=MediaBusiness.js.map
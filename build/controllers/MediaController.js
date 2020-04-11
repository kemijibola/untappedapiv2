"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var decorators_1 = require("../decorators");
var MediaBusiness = require("../app/business/MediaBusiness");
var interfaces_1 = require("../app/models/interfaces");
var error_1 = require("../utils/error");
var auth_1 = require("../middlewares/auth");
var ValidateRequest_1 = require("../middlewares/ValidateRequest");
// SAMPLE GET ROUTE:: http://localhost:9000?user=1234&medias?type=all&upload=single
// SAMPLE GET ROUTE:: http://localhost:9000?user=1234&medias?type=all&upload=all
// SAMPLE GET ROUTE:: http://localhost:9000?medias?type=videos&upload=single
// SAMPLE GET ROUTE:: http://localhost:9000?medias?type=images&upload=all
// SAMPLE GET ROUTE:: http://localhost:9000?medias?type=audios&upload=multiple
// SAMPLE POST ROUTE:: http://localhost:8900/medias?type=audio
// SAMPLE PUT ROUTE:: http://localhost:8900/medias/:id?type=audio
var MediaController = /** @class */ (function () {
    function MediaController() {
    }
    MediaController.prototype.update = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadType, mediaType, systemMediaTypes, update, mediaBusiness, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uploadType = "";
                        if (req.body.items) {
                            uploadType = req.body.items.length > 1 ? "multiple" : "single";
                        }
                        mediaType = req.body.mediaType.toLowerCase();
                        systemMediaTypes = Object.values(interfaces_1.MediaType);
                        if (!systemMediaTypes.includes(mediaType)) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Invalid mediaType",
                                }))];
                        }
                        req.body.uploadType = uploadType;
                        req.body.mediaType = mediaType;
                        update = req.body;
                        update.user = req.user;
                        mediaBusiness = new MediaBusiness();
                        return [4 /*yield*/, mediaBusiness.update(req.params.id, update)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        }
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MediaController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadType, mediaType, systemMediaTypes, modifiedItems, newMedia, mediaBusiness, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (req.body.items.length < 1) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide at least 1 media to upload in items",
                                }))];
                        }
                        uploadType = req.body.items.length > 1 ? "multiple" : "single";
                        mediaType = req.body.mediaType.toLowerCase();
                        systemMediaTypes = Object.values(interfaces_1.MediaType);
                        if (!systemMediaTypes.includes(mediaType)) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Invalid mediaType",
                                }))];
                        }
                        modifiedItems = req.body.items.reduce(function (theMap, theItem) {
                            var item = {
                                path: theItem.path,
                            };
                            theMap = theMap.concat([item]);
                            return theMap;
                        }, []);
                        req.body.items = modifiedItems.slice();
                        req.body.uploadType = uploadType;
                        req.body.mediaType = mediaType;
                        newMedia = req.body;
                        newMedia.user = req.user;
                        mediaBusiness = new MediaBusiness();
                        return [4 /*yield*/, mediaBusiness.create(newMedia)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        }
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_2 = _a.sent();
                        //       console.log(err);
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later.",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // SAMPLE GET USER MEDIA LIST ROUTE:: http://localhost:8900/medias?mediaType=audio&uploadType=all
    MediaController.prototype.fetchUserPreviewList = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadType, systemUploadTypes, mediaType, systemMediaTypes, condition, mediaBusiness, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!req.query.mediaType) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide mediaType in query param",
                                }))];
                        }
                        if (!req.query.uploadType) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide uploadType in query param",
                                }))];
                        }
                        uploadType = req.query.uploadType.toLowerCase();
                        systemUploadTypes = Object.values(interfaces_1.MediaUploadType);
                        if (!systemUploadTypes.includes(uploadType) && uploadType !== "all") {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Invalid uploadType",
                                }))];
                        }
                        mediaType = req.query.mediaType.toLowerCase();
                        systemMediaTypes = Object.values(interfaces_1.MediaType);
                        if (!systemMediaTypes.includes(mediaType) && mediaType !== "all") {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Invalid mediaType",
                                }))];
                        }
                        condition = {
                            isApproved: true,
                            isDeleted: false,
                        };
                        if (uploadType !== "all") {
                            condition.uploadType = uploadType;
                        }
                        if (mediaType !== "all") {
                            condition.mediaType = mediaType;
                        }
                        condition.user = req.user;
                        mediaBusiness = new MediaBusiness();
                        return [4 /*yield*/, mediaBusiness.fetchPreview(condition)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: "Error occured, " + result.error,
                                }))];
                        }
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Media Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_3 = _a.sent();
                        console.log(err_3);
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // SAMPLE GET USER MEDIA LIST ROUTE:: http://localhost:8900/medias?mediaType=audio&uploadType=all
    MediaController.prototype.fetchPreviewList = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadType, systemUploadTypes, mediaType, systemMediaTypes, condition, mediaBusiness, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!req.query.mediaType) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide mediaType in query param",
                                }))];
                        }
                        if (!req.query.uploadType) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide uploadType in query param",
                                }))];
                        }
                        uploadType = req.query.uploadType.toLowerCase();
                        systemUploadTypes = Object.values(interfaces_1.MediaUploadType);
                        if (!systemUploadTypes.includes(uploadType) && uploadType !== "all") {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Invalid uploadType",
                                }))];
                        }
                        mediaType = req.query.mediaType.toLowerCase();
                        systemMediaTypes = Object.values(interfaces_1.MediaType);
                        if (!systemMediaTypes.includes(mediaType) && mediaType !== "all") {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Invalid mediaType",
                                }))];
                        }
                        condition = {
                            isApproved: true,
                            isDeleted: false,
                        };
                        if (uploadType !== "all") {
                            condition.uploadType = uploadType;
                        }
                        if (mediaType !== "all") {
                            condition.mediaType = mediaType;
                        }
                        condition.user = req.params.id;
                        mediaBusiness = new MediaBusiness();
                        return [4 /*yield*/, mediaBusiness.fetchTalentPortfolioPreview(condition)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: "Error occured, " + result.error,
                                }))];
                        }
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Media Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_4 = _a.sent();
                        console.log(err_4);
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // SAMPLE GET USER MEDIA LIST ROUTE:: http://localhost:8900/medias?mediaType=audio&uploadType=all
    MediaController.prototype.fetchUserList = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadType, systemUploadTypes, mediaType, systemMediaTypes, condition, mediaBusiness, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!req.query.mediaType) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide mediaType in query param",
                                }))];
                        }
                        if (!req.query.uploadType) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide uploadType in query param",
                                }))];
                        }
                        uploadType = req.query.uploadType.toLowerCase();
                        systemUploadTypes = Object.values(interfaces_1.MediaUploadType);
                        if (!systemUploadTypes.includes(uploadType) && uploadType !== "all") {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Invalid uploadType",
                                }))];
                        }
                        mediaType = req.query.mediaType.toLowerCase();
                        systemMediaTypes = Object.values(interfaces_1.MediaType);
                        if (!systemMediaTypes.includes(mediaType) && mediaType !== "all") {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Invalid mediaType",
                                }))];
                        }
                        condition = {
                            isApproved: true,
                            isDeleted: false,
                        };
                        if (uploadType !== "all") {
                            condition.uploadType = uploadType;
                        }
                        if (mediaType !== "all") {
                            condition.mediaType = mediaType;
                        }
                        condition.user = req.user;
                        mediaBusiness = new MediaBusiness();
                        return [4 /*yield*/, mediaBusiness.fetch(condition)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: "Error occured, " + result.error,
                                }))];
                        }
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Media Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_5 = _a.sent();
                        console.log(err_5);
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured. Please try again later",
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // SAMPLE GET ALL LIST ROUTE:: http://localhost:8900/medias?type=audio&upload_type=all
    MediaController.prototype.fetchList = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadType, systemUploadTypes, mediaType, systemMediaTypes, condition, mediaBusiness, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!req.query.mediaType) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide mediaType in query param",
                                }))];
                        }
                        if (!req.query.uploadType) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Please provide uploadType in query param",
                                }))];
                        }
                        uploadType = req.query.uploadType.toLowerCase();
                        systemUploadTypes = Object.values(interfaces_1.MediaUploadType);
                        if (!systemUploadTypes.includes(uploadType)) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Invalid uploadType",
                                }))];
                        }
                        mediaType = req.query.mediaType.toLowerCase();
                        systemMediaTypes = Object.values(interfaces_1.MediaType);
                        if (!systemMediaTypes.includes(mediaType) && mediaType !== "all") {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 400,
                                    message: "Invalid mediaType",
                                }))];
                        }
                        condition = {};
                        if (uploadType !== "all") {
                            condition.uploadType = uploadType;
                        }
                        if (mediaType !== "all") {
                            condition.mediaType = mediaType;
                        }
                        mediaBusiness = new MediaBusiness();
                        return [4 /*yield*/, mediaBusiness.fetch(condition)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: "Error occured, " + result.error,
                                }))];
                        }
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Media Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_6 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured." + err_6,
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // SAMPLE GET SINGLE MEDIA ROUTE:: http://localhost:8900/medias/:id
    MediaController.prototype.fetch = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var mediaBusiness, result, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        mediaBusiness = new MediaBusiness();
                        return [4 /*yield*/, mediaBusiness.findById(req.params.id)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        }
                        if (result.data) {
                            result.data.items = result.data.items.filter(function (x) { return !x.isDeleted; });
                        }
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Media Operation successful",
                                data: result.data,
                            })];
                    case 2:
                        err_7 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured." + err_7,
                            }))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MediaController.prototype.deleteMedia = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var mediaBusiness, media, result, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        mediaBusiness = new MediaBusiness();
                        return [4 /*yield*/, mediaBusiness.findById(req.params.id)];
                    case 1:
                        media = _a.sent();
                        if (media.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: media.responseCode,
                                    message: media.error,
                                }))];
                        }
                        if (!media.data) return [3 /*break*/, 3];
                        if (media.data.user != req.user) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 403,
                                    message: "You are not authorized to perform this request.",
                                }))];
                        }
                        return [4 /*yield*/, mediaBusiness.delete(media.data._id)];
                    case 2:
                        result = _a.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        }
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Media Operation successful",
                                data: result.data,
                            })];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_8 = _a.sent();
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured." + err_8,
                            }))];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MediaController.prototype.deleteMediaItem = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var mediaBusiness, media, mediaUser, currentUser, result, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        mediaBusiness = new MediaBusiness();
                        return [4 /*yield*/, mediaBusiness.findById(req.params.id)];
                    case 1:
                        media = _a.sent();
                        if (media.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: media.responseCode,
                                    message: media.error,
                                }))];
                        }
                        if (media.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: media.responseCode,
                                    message: media.error,
                                }))];
                        }
                        if (!media.data) return [3 /*break*/, 3];
                        mediaUser = media.data.user;
                        currentUser = req.user;
                        if (mediaUser != currentUser) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: 403,
                                    message: "You are not authorized to perform this request.",
                                }))];
                        }
                        return [4 /*yield*/, mediaBusiness.deleteMediaItem(media.data._id, req.params.itemId)];
                    case 2:
                        result = _a.sent();
                        if (result.error) {
                            return [2 /*return*/, next(new error_1.PlatformError({
                                    code: result.responseCode,
                                    message: result.error,
                                }))];
                        }
                        return [2 /*return*/, res.status(result.responseCode).json({
                                message: "Media Operation successful",
                                data: result.data,
                            })];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_9 = _a.sent();
                        console.log(err_9);
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: "Internal Server error occured." + err_9,
                            }))];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        decorators_1.use(auth_1.requireAuth),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.put("/:id"),
        decorators_1.requestValidators("mediaType"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], MediaController.prototype, "update", null);
    __decorate([
        decorators_1.use(auth_1.requireAuth),
        decorators_1.post("/"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.requestValidators("title", "items", "mediaType"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], MediaController.prototype, "create", null);
    __decorate([
        decorators_1.get("/me/preview"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], MediaController.prototype, "fetchUserPreviewList", null);
    __decorate([
        decorators_1.get("/talent/:id/portfolio"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], MediaController.prototype, "fetchPreviewList", null);
    __decorate([
        decorators_1.get("/me"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], MediaController.prototype, "fetchUserList", null);
    __decorate([
        decorators_1.get("/"),
        decorators_1.use(ValidateRequest_1.requestValidator),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], MediaController.prototype, "fetchList", null);
    __decorate([
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.get("/:id"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], MediaController.prototype, "fetch", null);
    __decorate([
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        decorators_1.del("/:id"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], MediaController.prototype, "deleteMedia", null);
    __decorate([
        decorators_1.use(ValidateRequest_1.requestValidator),
        decorators_1.use(auth_1.requireAuth),
        decorators_1.del("/:id/item/:itemId"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], MediaController.prototype, "deleteMediaItem", null);
    MediaController = __decorate([
        decorators_1.controller("/v1/media")
    ], MediaController);
    return MediaController;
}());
exports.MediaController = MediaController;
//# sourceMappingURL=MediaController.js.map
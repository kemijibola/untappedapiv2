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
var AudioBusiness = require("../app/business/AudioBusiness");
var VideoBusiness = require("../app/business/VideoBusiness");
var ImageBusiness = require("../app/business/ImageBusiness");
var interfaces_1 = require("../app/models/interfaces");
var error_1 = require("../utils/error");
// TODO:: http://localhost:9000?user=1234&medias?type=all&upload=single
// TODO:: http://localhost:9000?user=1234&medias?type=all&upload=all
// TODO:: http://localhost:9000?medias?type=videos&upload=single
// TODO:: http://localhost:9000?medias?type=images&upload=all
// TODO:: http://localhost:9000?medias?type=audios&upload=multiple
var MediaController = /** @class */ (function () {
    function MediaController() {
    }
    MediaController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                }
                catch (err) {
                    // next(new InternalServerError('Internal Server error occured', 500));
                }
                return [2 /*return*/];
            });
        });
    };
    MediaController.prototype.update = function () { };
    MediaController.prototype.delete = function () { };
    MediaController.prototype.fetch = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var mediaType, condition, upload, _a, audioBusiness, audioResult, imageBusiness, imageResult, videoBusiness, videoResult, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        // audio, video, image, general
                        // if media = audio then fetch from audioCollection
                        // uploadType = all, set uploadType=''
                        // with uploadType and userId, set up condition
                        // SAMPLE QUERY REQUEST
                        // TODO:: http://localhost:9000?user=1234&medias?type=all&upload=single
                        // TODO:: http://localhost:9000?user=1234&medias?type=all&upload=all
                        // TODO:: http://localhost:9000?medias?type=videos&upload=single
                        // TODO:: http://localhost:9000?medias?type=images&upload=all
                        // TODO:: http://localhost:9000?medias?type=audios&upload=multiple
                        if (!req.query.type) {
                            return [2 /*return*/, next(error_1.PlatformError.error({
                                    code: 400,
                                    message: "Bad request.Parameter 'type' is missing in query"
                                }))];
                        }
                        if (!req.query.upload) {
                            return [2 /*return*/, next(error_1.PlatformError.error({
                                    code: 400,
                                    message: "Bad request.Parameter 'upload' is missing in query"
                                }))];
                        }
                        mediaType = req.query.type.toLowerCase();
                        condition = {};
                        upload = req.query.upload.toLowerCase();
                        condition.uploadType = interfaces_1.MediaUploadType[upload];
                        if (condition['upload'] === interfaces_1.MediaUploadType.all) {
                            condition.uploadType = '';
                        }
                        if (req.query.userId) {
                            condition.user = req.query.userId;
                        }
                        _a = mediaType;
                        switch (_a) {
                            case interfaces_1.MediaType.audio: return [3 /*break*/, 1];
                            case interfaces_1.MediaType.image: return [3 /*break*/, 3];
                            case interfaces_1.MediaType.video: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1:
                        audioBusiness = new AudioBusiness();
                        return [4 /*yield*/, audioBusiness.fetch(condition)];
                    case 2:
                        audioResult = _b.sent();
                        if (audioResult.error) {
                            return [2 /*return*/, next(error_1.PlatformError.error({
                                    code: audioResult.responseCode,
                                    message: "Error occured. " + audioResult.error
                                }))];
                        }
                        return [2 /*return*/, res.status(audioResult.responseCode).json({
                                message: 'Audio Operation successful',
                                data: audioResult.data
                            })];
                    case 3:
                        imageBusiness = new ImageBusiness();
                        return [4 /*yield*/, imageBusiness.fetch(condition)];
                    case 4:
                        imageResult = _b.sent();
                        if (imageResult.error) {
                            return [2 /*return*/, next(error_1.PlatformError.error({
                                    code: imageResult.responseCode,
                                    message: "Error occured. " + imageResult.error
                                }))];
                        }
                        return [2 /*return*/, res.status(imageResult.responseCode).json({
                                message: 'Operation successful',
                                data: imageResult.data
                            })];
                    case 5:
                        videoBusiness = new VideoBusiness();
                        return [4 /*yield*/, videoBusiness.fetch(condition)];
                    case 6:
                        videoResult = _b.sent();
                        if (videoResult.error) {
                            return [2 /*return*/, next(error_1.PlatformError.error({
                                    code: videoResult.responseCode,
                                    message: "Error occured. " + videoResult.error
                                }))];
                        }
                        return [2 /*return*/, res.status(videoResult.responseCode).json({
                                message: 'Operation successful',
                                data: videoResult.data
                            })];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        err_1 = _b.sent();
                        return [2 /*return*/, next(error_1.PlatformError.error({
                                code: 500,
                                message: "Internal Server error occured." + err_1
                            }))];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    MediaController.prototype.findById = function (req, res, next) { };
    __decorate([
        decorators_1.post('/'),
        decorators_1.requestValidators('title', 'items'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], MediaController.prototype, "create", null);
    __decorate([
        decorators_1.get('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], MediaController.prototype, "fetch", null);
    __decorate([
        decorators_1.get('/:id'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", void 0)
    ], MediaController.prototype, "findById", null);
    MediaController = __decorate([
        decorators_1.controller('/v1/media')
    ], MediaController);
    return MediaController;
}());
exports.MediaController = MediaController;
//# sourceMappingURL=MediaController.js.map
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
var AudioRepository = require("../app/repository/AudioRepository");
var VideoRepository = require("../app/repository/VideoRepository");
var ImageRepository = require("../app/repository/ImageRepository");
var error_1 = require("../utils/error");
var lib_1 = require("../utils/lib");
var MediaController = /** @class */ (function () {
    function MediaController() {
    }
    MediaController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var item, _a, _1, fileExtension, audioModel, audio, videoModel, video, imageModel, image, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 11, , 12]);
                        item = req.body;
                        _a = item.items[0].path.split('.'), _1 = _a[0], fileExtension = _a[1];
                        if (!lib_1.audioExtentions.includes(fileExtension)) return [3 /*break*/, 3];
                        return [4 /*yield*/, new AudioRepository().findByCriteria({
                                title: item.title.toLowerCase()
                            })];
                    case 1:
                        audioModel = _b.sent();
                        if (audioModel.title)
                            return [2 /*return*/, next(new error_1.RecordExists("Audio title: " + item.title + " exists", 400))];
                        return [4 /*yield*/, new AudioRepository().create(item)];
                    case 2:
                        audio = _b.sent();
                        return [2 /*return*/, res.status(201).json({
                                message: 'Operation successful',
                                data: audio
                            })];
                    case 3:
                        if (!lib_1.videoExtensions.includes(fileExtension)) return [3 /*break*/, 6];
                        return [4 /*yield*/, new VideoRepository().findByCriteria({
                                title: item.title.toLowerCase()
                            })];
                    case 4:
                        videoModel = _b.sent();
                        if (videoModel.title)
                            next(new error_1.RecordExists("Video title: " + item.title + " exists", 400));
                        return [4 /*yield*/, new VideoRepository().create(item)];
                    case 5:
                        video = _b.sent();
                        return [2 /*return*/, res.status(201).json({
                                message: 'Operational successful',
                                data: video
                            })];
                    case 6:
                        if (!lib_1.imageExtensions.includes(fileExtension)) return [3 /*break*/, 9];
                        return [4 /*yield*/, new ImageRepository().findByCriteria({
                                title: item.title.toLowerCase()
                            })];
                    case 7:
                        imageModel = _b.sent();
                        if (imageModel)
                            next(new error_1.RecordExists("Image title: " + item.title + " exists", 400));
                        return [4 /*yield*/, new ImageRepository().create(item)];
                    case 8:
                        image = _b.sent();
                        return [2 /*return*/, res.status(201).json({
                                message: 'Operation successful',
                                data: image
                            })];
                    case 9: return [2 /*return*/, next(new error_1.InvalidContent(fileExtension + " is not a supported format", 400))];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        err_1 = _b.sent();
                        next(new error_1.InternalServerError('Internal Server error occured', 500));
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    MediaController.prototype.update = function () { };
    MediaController.prototype.delete = function () { };
    MediaController.prototype.fetch = function () { };
    MediaController.prototype.findById = function () { };
    __decorate([
        decorators_1.post('/'),
        decorators_1.requestValidators('title', 'items'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], MediaController.prototype, "create", null);
    MediaController = __decorate([
        decorators_1.controller('./medias')
    ], MediaController);
    return MediaController;
}());
//# sourceMappingURL=MediaController.js.map
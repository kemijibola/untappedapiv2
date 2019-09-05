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
var VideoRepository_1 = __importDefault(require("../repository/VideoRepository"));
var interfaces_1 = require("../models/interfaces");
var Result_1 = require("../../utils/Result");
var TaskScheduler_1 = require("../../utils/TaskScheduler");
var StateMachineArns_1 = require("../models/interfaces/custom/StateMachineArns");
var VideoBusiness = /** @class */ (function () {
    function VideoBusiness() {
        this._videoRepository = new VideoRepository_1.default();
    }
    // TODO:: ensure soft delete on all media items: Audio, Image and Video
    VideoBusiness.prototype.fetch = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var videos, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition.isApproved = true;
                        condition.isDeleted = false;
                        return [4 /*yield*/, this._videoRepository.fetch(condition)];
                    case 1:
                        videos = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, videos)];
                    case 2:
                        err_1 = _a.sent();
                        throw new Error("InternalServer error occured." + err_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VideoBusiness.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var criteria, video, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!id)
                            return [2 /*return*/, Result_1.Result.fail(400, 'Bad request')];
                        criteria = {
                            id: id,
                            isApproved: true,
                            isDeleted: false
                        };
                        return [4 /*yield*/, this._videoRepository.findByIdCriteria(criteria)];
                    case 1:
                        video = _a.sent();
                        if (!video)
                            return [2 /*return*/, Result_1.Result.fail(404, "Video of Id " + id + " not found")];
                        else
                            return [2 /*return*/, Result_1.Result.ok(200, video)];
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        throw new Error("InternalServer error occured." + err_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VideoBusiness.prototype.findOne = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var video, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!condition)
                            return [2 /*return*/, Result_1.Result.fail(400, 'Bad request')];
                        condition.isApproved = true;
                        condition.isDeleted = false;
                        return [4 /*yield*/, this._videoRepository.findByOne(condition)];
                    case 1:
                        video = _a.sent();
                        if (!video)
                            return [2 /*return*/, Result_1.Result.fail(404, "Video not found")];
                        else
                            return [2 /*return*/, Result_1.Result.ok(200, video)];
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        throw new Error("InternalServer error occured." + err_3.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VideoBusiness.prototype.findByCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var video, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!criteria)
                            return [2 /*return*/, Result_1.Result.fail(400, 'Bad request')];
                        criteria.isApproved = true;
                        criteria.isDeleted = false;
                        return [4 /*yield*/, this._videoRepository.findByCriteria(criteria)];
                    case 1:
                        video = _a.sent();
                        if (!video)
                            return [2 /*return*/, Result_1.Result.fail(404, "Video not found")];
                        else
                            return [2 /*return*/, Result_1.Result.ok(200, video)];
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        throw new Error("InternalServer error occured." + err_4.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VideoBusiness.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var newVideo, approvalRequest, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        item.isApproved = false;
                        item.isDeleted = false;
                        return [4 /*yield*/, this._videoRepository.create(item)];
                    case 1:
                        newVideo = _a.sent();
                        approvalRequest = Object.assign({
                            entity: newVideo._id,
                            operation: interfaces_1.ApprovalOperations.VideoUpload,
                            application: 'untappedpool.com'
                        });
                        return [4 /*yield*/, TaskScheduler_1.schedule(StateMachineArns_1.StateMachineArns.MediaStateMachine, newVideo.createdAt, approvalRequest)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(201, true)];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("InternalServer error occured." + err_5.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VideoBusiness.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var video, updateObj, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this._videoRepository.findById(id)];
                    case 1:
                        video = _a.sent();
                        if (!video)
                            return [2 /*return*/, Result_1.Result.fail(404, "Could not update video.Video with Id " + id + " not found")];
                        item.isApproved = video.isApproved;
                        item.isDeleted = video.isDeleted;
                        return [4 /*yield*/, this._videoRepository.update(video._id, item)];
                    case 2:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("InternalServer error occured." + err_6.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VideoBusiness.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isDeleted, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._videoRepository.delete(id)];
                    case 1:
                        isDeleted = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, isDeleted)];
                    case 2:
                        err_7 = _a.sent();
                        throw new Error("InternalServer error occured." + err_7.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return VideoBusiness;
}());
Object.seal(VideoBusiness);
module.exports = VideoBusiness;
//# sourceMappingURL=VideoBusiness.js.map
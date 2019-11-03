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
var ImageRepository_1 = __importDefault(require("../repository/ImageRepository"));
var interfaces_1 = require("../models/interfaces");
var Result_1 = require("../../utils/Result");
var ScheduleTask_1 = require("../../handlers/ScheduleTask");
var StateMachineArns_1 = require("../models/interfaces/custom/StateMachineArns");
var ImageBusiness = /** @class */ (function () {
    function ImageBusiness() {
        this._imageRepository = new ImageRepository_1.default();
    }
    ImageBusiness.prototype.fetch = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var images, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        condition.isApproved = true;
                        condition.isDeleted = false;
                        return [4 /*yield*/, this._imageRepository.fetch(condition)];
                    case 1:
                        images = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, images)];
                    case 2:
                        err_1 = _a.sent();
                        throw new Error("InternalServer error occured." + err_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ImageBusiness.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var criteria, image, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!id)
                            return [2 /*return*/, Result_1.Result.fail(400, 'Bad request.')];
                        criteria = {
                            id: id,
                            isApproved: true,
                            isDeleted: false
                        };
                        return [4 /*yield*/, this._imageRepository.findByIdCriteria(criteria)];
                    case 1:
                        image = _a.sent();
                        if (!image)
                            return [2 /*return*/, Result_1.Result.fail(404, "Image of Id " + id + " not found")];
                        else
                            return [2 /*return*/, Result_1.Result.ok(200, image)];
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        throw new Error("InternalServer error occured." + err_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ImageBusiness.prototype.findOne = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var image, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!condition)
                            return [2 /*return*/, Result_1.Result.fail(400, 'Bad request.')];
                        condition.isApproved = true;
                        condition.isDeleted = false;
                        return [4 /*yield*/, this._imageRepository.findByOne(condition)];
                    case 1:
                        image = _a.sent();
                        if (!image)
                            return [2 /*return*/, Result_1.Result.fail(404, "Image not found")];
                        else
                            return [2 /*return*/, Result_1.Result.ok(200, image)];
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        throw new Error("InternalServer error occured." + err_3.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ImageBusiness.prototype.findByCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var image, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!criteria)
                            return [2 /*return*/, Result_1.Result.fail(400, 'Bad request')];
                        criteria.isApproved = true;
                        criteria.isDeleted = false;
                        return [4 /*yield*/, this._imageRepository.findByCriteria(criteria)];
                    case 1:
                        image = _a.sent();
                        if (!image)
                            return [2 /*return*/, Result_1.Result.fail(404, "Image not found")];
                        else
                            return [2 /*return*/, Result_1.Result.ok(200, image)];
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        throw new Error("InternalServer error occured." + err_4.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ImageBusiness.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var newImage, approvalRequest, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        item.isApproved = false;
                        item.isDeleted = false;
                        return [4 /*yield*/, this._imageRepository.create(item)];
                    case 1:
                        newImage = _a.sent();
                        approvalRequest = Object.assign({
                            entity: newImage._id,
                            operation: interfaces_1.ApprovalOperations.ImageUpload,
                            application: 'untappedpool.com'
                        });
                        return [4 /*yield*/, ScheduleTask_1.schedule(StateMachineArns_1.StateMachineArns.MediaStateMachine, newImage.createdAt, approvalRequest)];
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
    ImageBusiness.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var criteria, image, updateObj, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        criteria = {
                            id: id,
                            isApproved: true,
                            isDeleted: false
                        };
                        return [4 /*yield*/, this._imageRepository.findByIdCriteria(criteria)];
                    case 1:
                        image = _a.sent();
                        if (!image)
                            return [2 /*return*/, Result_1.Result.fail(404, "Could not update image.Image with Id " + id + " not found")];
                        item.isApproved = image.isApproved;
                        return [4 /*yield*/, this._imageRepository.update(image._id, item)];
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
    ImageBusiness.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isDeleted, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._imageRepository.delete(id)];
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
    return ImageBusiness;
}());
Object.seal(ImageBusiness);
module.exports = ImageBusiness;
//# sourceMappingURL=ImageBusiness.js.map
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Upload_1 = require("./../../uploadservice/Helper/Upload");
var Uploader_1 = require("../Uploader");
var AWS = __importStar(require("aws-sdk"));
var Result_1 = require("../../Result");
var lib_1 = require("../../lib");
var uuid = require("uuid");
var config = module.require("../../../config/keys");
AWS.config.update({
    accessKeyId: config.VIDEO_BUCKET.access_key_id,
    secretAccessKey: config.VIDEO_BUCKET.secret_access_key,
    region: config.IMAGE_BUCKET.region,
    signatureVersion: "v4",
});
var Video = /** @class */ (function (_super) {
    __extends(Video, _super);
    function Video() {
        return _super.call(this) || this;
    }
    Video.prototype.getThumbNailUrl = function (uploader, encodedImage) {
        return __awaiter(this, void 0, void 0, function () {
            var signedUrls, signedUrl, key, params, options, client, _a, Location_1, Key, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        signedUrls = {
                            presignedUrl: [],
                            component: Upload_1.UPLOADOPERATIONS.thumbnail,
                        };
                        signedUrl = {
                            file: "",
                            url: "",
                            key: "",
                        };
                        key = uploader + "/images/thumbnail/" + uuid() + ".png";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        params = {
                            Bucket: config.APP_BUCKET.bucket,
                            Key: key,
                            Body: encodedImage,
                            ContentEncoding: "base64",
                            ContentType: "image/png",
                        };
                        options = {
                            signatureVersion: "v4",
                            region: config.APP_BUCKET.region,
                        };
                        client = new AWS.S3(options);
                        return [4 /*yield*/, client.upload(params).promise()];
                    case 2:
                        _a = _b.sent(), Location_1 = _a.Location, Key = _a.Key;
                        signedUrl = {
                            file: "none",
                            url: Location_1,
                            key: Key,
                        };
                        signedUrls.presignedUrl = signedUrls.presignedUrl.concat([signedUrl]);
                        return [2 /*return*/, Result_1.Result.ok(200, signedUrls)];
                    case 3:
                        err_1 = _b.sent();
                        console.log(err_1);
                        throw new Error("Internal server error occured");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Video.prototype.getPresignedUrl = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var signedUrls, signedUrl, filesMap, _loop_1, _a, _b, _i, item, err_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        signedUrls = {
                            presignedUrl: [],
                            component: data.action,
                        };
                        signedUrl = {
                            file: "",
                            url: "",
                            key: "",
                        };
                        if (!data.files) return [3 /*break*/, 7];
                        filesMap = data.files.reduce(function (theMap, item) {
                            var fileExtension = item.file.split(".").pop() || "";
                            fileExtension = fileExtension.toLowerCase();
                            if (!lib_1.AcceptedVideoExt[fileExtension]) {
                                return Result_1.Result.fail(400, fileExtension + " is not allowed.");
                            }
                            theMap[item.file] = data.uploader + "/videos/" + Upload_1.UPLOADOPERATIONS[data.action] + "/" + uuid() + "." + fileExtension;
                            return theMap;
                        }, {});
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, , 7]);
                        _loop_1 = function (item) {
                            var params, options, client, signed;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        params = {
                                            Bucket: config.VIDEO_BUCKET.bucket,
                                            Key: filesMap[item],
                                            Expires: 30 * 60,
                                            ContentType: data.files[0].file_type,
                                        };
                                        options = {
                                            signatureVersion: "v4",
                                            region: config.VIDEO_BUCKET.region
                                        };
                                        client = new AWS.S3(options);
                                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                                client.getSignedUrl("putObject", params, function (err, data) {
                                                    if (err)
                                                        reject(err);
                                                    resolve(data);
                                                });
                                            })];
                                    case 1:
                                        signed = _a.sent();
                                        signedUrl = {
                                            file: item,
                                            url: signed,
                                            key: filesMap[item],
                                        };
                                        signedUrls.presignedUrl = signedUrls.presignedUrl.concat([signedUrl]);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _a = [];
                        for (_b in filesMap)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        item = _a[_i];
                        return [5 /*yield**/, _loop_1(item)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, Result_1.Result.ok(200, signedUrls)];
                    case 6:
                        err_2 = _c.sent();
                        throw new Error("Internal server error occured");
                    case 7: return [2 /*return*/, Result_1.Result.fail(400, "No file uploaded.")];
                }
            });
        });
    };
    return Video;
}(Uploader_1.AbstractMedia));
exports.Video = Video;
//# sourceMappingURL=Video.js.map
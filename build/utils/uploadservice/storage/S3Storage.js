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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var AWS = __importStar(require("aws-sdk"));
var Upload_1 = require("../Helper/Upload");
var lib_1 = require("../../lib");
var uuid = require("uuid");
var Result_1 = require("../../Result");
var config = module.require("../../../config/keys");
// import * as cloudConfig from '../../../config/cloudConfig.json';
AWS.config.update({
    accessKeyId: config.APP_BUCKET.access_key_id,
    secretAccessKey: config.APP_BUCKET.secret_access_key,
    region: config.APP_BUCKET.region,
    signatureVersion: "v4",
});
var S3Storage = /** @class */ (function () {
    // private s3 ;
    function S3Storage() {
        // AWS.config.update({
        //   accessKeyId: config.APP_BUCKET.access_key_id,
        //   secretAccessKey: config.APP_BUCKET.secret_access_key,
        //   region: config.APP_BUCKET.region,
        //   signatureVersion: "v4"
        // });
        // this.s3 = new AWS.S3({
        //   useAccelerateEndpoint: true
        // });
    }
    S3Storage.prototype.putThumbNail = function (uploader, encodedImage) {
        return __awaiter(this, void 0, void 0, function () {
            var signedUrls, signedUrl, key, params_1, options, client_1, signed, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
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
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        params_1 = {
                            Bucket: config.APP_BUCKET.bucket,
                            Key: key,
                            Body: encodedImage,
                            ContentEncoding: "base64",
                            Expires: 30 * 60,
                            ContentType: "image/png",
                        };
                        options = {
                            signatureVersion: "v4",
                            region: config.APP_BUCKET.region,
                            endpoint: "untapped-platform-bucket.s3-accelerate.amazonaws.com",
                            useAccelerateEndpoint: true,
                        };
                        client_1 = new AWS.S3(options);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                client_1.getSignedUrl("putObject", params_1, function (err, data) {
                                    if (err)
                                        reject(err);
                                    resolve(data);
                                });
                            })];
                    case 2:
                        signed = _a.sent();
                        signedUrl = {
                            file: "none",
                            url: signed,
                            key: key,
                        };
                        signedUrls.presignedUrl = signedUrls.presignedUrl.concat([signedUrl]);
                        return [2 /*return*/, Result_1.Result.ok(200, signedUrls)];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        throw new Error("Internal server error occured");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // async getObject():
    S3Storage.prototype.putObject = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var signedUrlExpireSeconds, signedUrls, signedUrl, filesMap, _loop_1, _a, _b, _i, item, err_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        signedUrlExpireSeconds = 60 * 60;
                        signedUrls = {
                            presignedUrl: [],
                            component: Upload_1.UPLOADOPERATIONS.profileimage,
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
                            // we are ensuring the user sent valid media type for processing on s3
                            if (!lib_1.AcceptedImageExt[fileExtension]) {
                                return Result_1.Result.fail(400, fileExtension + " is not allowed.");
                            }
                            theMap[item.file] = data.uploader + "/" + lib_1.AcceptedImageExt[fileExtension] + "/" + Upload_1.UPLOADOPERATIONS[data.action] + "/" + uuid() + "." + fileExtension;
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
                                            Bucket: config.APP_BUCKET.bucket,
                                            Key: filesMap[item],
                                            Expires: 30 * 60,
                                            ContentType: data.files[0].file_type,
                                        };
                                        options = {
                                            signatureVersion: "v4",
                                            region: config.APP_BUCKET.region,
                                            endpoint: "untapped-platform-bucket.s3-accelerate.amazonaws.com",
                                            useAccelerateEndpoint: true,
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
                        console.log(err_2);
                        throw new Error("Internal server error occured");
                    case 7: return [2 /*return*/, Result_1.Result.fail(400, "No file uploaded.")];
                }
            });
        });
    };
    S3Storage.prototype.putBase64Object = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var signedUrlExpireSeconds, signedUrls, signedUrl, filesMap, _loop_2, _a, _b, _i, item, err_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        signedUrlExpireSeconds = 60 * 60;
                        signedUrls = {
                            presignedUrl: [],
                            component: Upload_1.UPLOADOPERATIONS.profileimage,
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
                            // we are ensuring the user sent valid media type for processing on s3
                            if (!lib_1.AcceptedImageExt[fileExtension]) {
                                return Result_1.Result.fail(400, fileExtension + " is not allowed.");
                            }
                            theMap[item.file] = data.uploader + "/" + lib_1.AcceptedImageExt[fileExtension] + "/" + Upload_1.UPLOADOPERATIONS[data.action] + "/" + uuid() + "." + fileExtension;
                            return theMap;
                        }, {});
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, , 7]);
                        _loop_2 = function (item) {
                            var params, options, client, signed;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        params = {
                                            Bucket: config.APP_BUCKET.bucket,
                                            Key: filesMap[item],
                                            Expires: 30 * 60,
                                            ContentType: data.files[0].file_type,
                                        };
                                        options = {
                                            signatureVersion: "v4",
                                            region: config.APP_BUCKET.region,
                                            endpoint: "untapped-platform-bucket.s3-accelerate.amazonaws.com",
                                            useAccelerateEndpoint: true,
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
                        return [5 /*yield**/, _loop_2(item)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, Result_1.Result.ok(200, signedUrls)];
                    case 6:
                        err_3 = _c.sent();
                        console.log(err_3);
                        throw new Error("Internal server error occured");
                    case 7: return [2 /*return*/, Result_1.Result.fail(400, "No file uploaded.")];
                }
            });
        });
    };
    return S3Storage;
}());
exports.S3Storage = S3Storage;
//# sourceMappingURL=S3Storage.js.map
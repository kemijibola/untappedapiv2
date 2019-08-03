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
var config = require('../../config/keys');
var ResourceBusiness_1 = __importDefault(require("../../app/business/ResourceBusiness"));
var PermissionBusiness_1 = __importDefault(require("../../app/business/PermissionBusiness"));
var ResourcePermissionBusiness_1 = __importDefault(require("../../app/business/ResourcePermissionBusiness"));
var ApplicationBusiness_1 = __importDefault(require("../../app/business/ApplicationBusiness"));
var error_1 = require("../error");
var mongoose_1 = __importDefault(require("mongoose"));
var Result_1 = require("../Result");
var chunkedUserPermissons = {};
exports.getSecretByKey = function (keyId) {
    var secret = config.RSA_PRIVATE.filter(function (x) { return x.key === keyId; })[0];
    if (!secret) {
        return '';
    }
    return secret.Secret.replace(/\\n/g, '\n');
};
exports.getPublicKey = function (keyId) {
    var secret = config.RSA_PUBLIC.filter(function (x) { return x.key === keyId; })[0];
    if (!secret) {
        return '';
    }
    return secret.Secret.replace(/\\n/g, '\n');
};
function tokenExchange(exchangeParams) {
    return __awaiter(this, void 0, void 0, function () {
        var resourceBusiness, resourcePermissionBusiness, result, destinationResource, _i, _a, role, result_1, resourcePermission;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    resourceBusiness = new ResourceBusiness_1.default();
                    resourcePermissionBusiness = new ResourcePermissionBusiness_1.default();
                    return [4 /*yield*/, resourceBusiness.findByCriteria({
                            name: exchangeParams.destinationUrl
                        })];
                case 1:
                    result = _b.sent();
                    if (result.error) {
                        throw error_1.PlatformError.error({
                            code: result.responseCode,
                            message: result.error
                        });
                    }
                    if (!result.data) return [3 /*break*/, 6];
                    destinationResource = result.data;
                    _i = 0, _a = exchangeParams.roles;
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    role = _a[_i];
                    return [4 /*yield*/, resourcePermissionBusiness.findByCriteria({
                            role: role,
                            resource: destinationResource._id
                        })];
                case 3:
                    result_1 = _b.sent();
                    if (result_1.error) {
                        throw error_1.PlatformError.error({
                            code: result_1.responseCode,
                            message: "There are no permissions configured for route " + destinationResource.name
                        });
                    }
                    if (!result_1.data) return [3 /*break*/, 5];
                    resourcePermission = result_1.data;
                    if (!resourcePermission.permissions) return [3 /*break*/, 5];
                    return [4 /*yield*/, chunckPermission(resourcePermission.permissions)];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6:
                    Object.seal(chunkedUserPermissons);
                    return [2 /*return*/, chunkedUserPermissons];
            }
        });
    });
}
exports.tokenExchange = tokenExchange;
function chunckPermission(permissions) {
    return __awaiter(this, void 0, void 0, function () {
        var permissionBusiness, _i, permissions_1, item, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    permissionBusiness = new PermissionBusiness_1.default();
                    _i = 0, permissions_1 = permissions;
                    _a.label = 1;
                case 1:
                    if (!(_i < permissions_1.length)) return [3 /*break*/, 4];
                    item = permissions_1[_i];
                    return [4 /*yield*/, permissionBusiness.findByCriteria(item)];
                case 2:
                    result = _a.sent();
                    if (result.data)
                        if (!chunkedUserPermissons[result.data.name]) {
                            chunkedUserPermissons[result.data.name] = result.data.name;
                        }
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function toObjectId(_id) {
    return mongoose_1.default.Types.ObjectId.createFromHexString(_id);
}
exports.toObjectId = toObjectId;
function isValidIdentity(audience) {
    return __awaiter(this, void 0, void 0, function () {
        var applicationBusiness, app, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    applicationBusiness = new ApplicationBusiness_1.default();
                    return [4 /*yield*/, applicationBusiness.findByCriteria({
                            identity: audience
                        })];
                case 1:
                    app = _a.sent();
                    if (!app)
                        return [2 /*return*/, Result_1.Result.fail(404, "Audience '" + audience + "' not found")];
                    return [2 /*return*/, Result_1.Result.ok(200, true)];
                case 2:
                    err_1 = _a.sent();
                    throw new Error("InternalServer error occured." + err_1.message);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.isValidIdentity = isValidIdentity;
function dateStringToDate(dateString) {
    // const dateParts = dateString.split('/').map((value: string) => {
    //   return parseInt(value);
    // });
    var year = parseInt(dateString.year);
    var month = parseInt(dateString.month);
    var date = 0;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    if (dateString.date) {
        date = parseInt(dateString.date);
    }
    if (dateString.hours) {
        hours = parseInt(dateString.hours);
    }
    if (dateString.minutes) {
        minutes = parseInt(dateString.minutes);
    }
    if (dateString.seconds) {
        seconds = parseInt(dateString.seconds);
    }
    return new Date(year, month, date, hours, minutes, seconds);
}
exports.dateStringToDate = dateStringToDate;
function escapeJSON(json) {
    var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var meta = {
        // table of character substitutions
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\'
    };
    escapable.lastIndex = 0;
    return escapable.test(json)
        ? '"' +
            json.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string'
                    ? c
                    : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) +
            '"'
        : '"' + json + '"';
}
exports.escapeJSON = escapeJSON;
//# sourceMappingURL=Helper.js.map
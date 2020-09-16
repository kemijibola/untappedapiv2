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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var config = require("../../config/keys");
var ApplicationBusiness_1 = __importDefault(require("../../app/business/ApplicationBusiness"));
var Result_1 = require("../Result");
var mongoose = __importStar(require("mongoose"));
var crypto_js_1 = require("crypto-js");
var crypto_1 = require("crypto");
var chunkedUserPermissons = {};
exports.getSecretByKey = function (keyId) {
    var secret = config.RSA_PRIVATE.filter(function (x) { return x.key === keyId; })[0];
    if (!secret) {
        return "";
    }
    return secret.Secret.replace(/\\n/g, "\n");
};
exports.validateObjectId = function (id) {
    var hexReg = new RegExp("^[0-9a-fA-F]{24}$");
    return hexReg.test(id);
};
exports.getPublicKey = function (keyId) {
    var secret = config.RSA_PUBLIC.filter(function (x) { return x.key === keyId; })[0];
    if (!secret) {
        return "";
    }
    return secret.Secret.replace(/\\n/g, "\n");
};
function isValidIdentity(audience) {
    return __awaiter(this, void 0, void 0, function () {
        var applicationBusiness, app, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    applicationBusiness = new ApplicationBusiness_1.default();
                    return [4 /*yield*/, applicationBusiness.findByCriteria({
                            identity: audience,
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
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\",
    };
    escapable.lastIndex = 0;
    return escapable.test(json)
        ? '"' +
            json.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === "string"
                    ? c
                    : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) +
            '"'
        : '"' + json + '"';
}
exports.escapeJSON = escapeJSON;
function generateInvoiceNo() {
    var number = Math.floor(Math.random() * 9999) + 1;
    var numberStr = "";
    if (number.toString().length <= 4) {
        numberStr = String("0000" + number).slice(-4);
    }
    var dt = new Date();
    var day = dt.getDate();
    var m = dt.getMonth() + 1;
    var retVal = "UP" + "/" + day + "" + m + "/" + numberStr;
    return retVal;
}
exports.generateInvoiceNo = generateInvoiceNo;
// export function generateContestant
function generateRandomNumber(size) {
    var otp = "";
    var possible = "0123456789";
    for (var i = 0; i < size; i++) {
        otp += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return otp;
}
exports.generateRandomNumber = generateRandomNumber;
function generateCustomChar(size) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
    for (var i = 0; i < size; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
exports.generateCustomChar = generateCustomChar;
function generateAutoPassword() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789abcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 8; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
exports.generateAutoPassword = generateAutoPassword;
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < 2; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
exports.makeid = makeid;
function getRandomId() {
    var number = Math.floor(Math.random() * 99999) + 1;
    var numberStr = "";
    if (number.toString().length <= 5) {
        numberStr = String("00000" + number).slice(-5);
    }
    var retVal = makeid() + "-" + numberStr;
    return retVal;
}
exports.getRandomId = getRandomId;
function toObjectId(_id) {
    return mongoose.Types.ObjectId.createFromHexString(_id);
}
exports.toObjectId = toObjectId;
function getTime(date) {
    return date != null ? new Date(date).getTime() : 0;
}
exports.getTime = getTime;
function isUnique(arr) {
    var seenValues = {};
    for (var i = 0; i < arr.length; i++) {
        if (seenValues[arr[i]]) {
            return false;
        }
        else {
            seenValues[arr[i]] = true;
        }
    }
    return true;
}
exports.isUnique = isUnique;
function encrypt(keys, value) {
    var key = crypto_js_1.enc.Utf8.parse(keys);
    var iv = crypto_js_1.enc.Utf8.parse(keys);
    var encrypted = crypto_js_1.AES.encrypt(crypto_js_1.enc.Utf8.parse(value.toString()), key, {
        keySize: 128 / 8,
        iv: iv,
        mode: crypto_js_1.mode.CBC,
        padding: crypto_js_1.pad.Pkcs7,
    });
    return encrypted.toString();
}
exports.encrypt = encrypt;
function decrypt(keys, value) {
    var key = crypto_js_1.enc.Utf8.parse(keys);
    var iv = crypto_js_1.enc.Utf8.parse(keys);
    var decrypted = crypto_js_1.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: crypto_js_1.mode.CBC,
        padding: crypto_js_1.pad.Pkcs7,
    });
    return decrypted.toString(crypto_js_1.enc.Utf8);
}
exports.decrypt = decrypt;
function signatureHash(secret, data) {
    return crypto_1.createHmac("sha512", secret).update(data).digest("hex");
}
exports.signatureHash = signatureHash;
function walletKey() {
    return config.KEY;
}
exports.walletKey = walletKey;
//# sourceMappingURL=Helper.js.map
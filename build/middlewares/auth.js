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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var error_1 = require("../utils/error");
var lib_1 = require("../utils/lib");
var GlobalEnum_1 = require("../app/models/interfaces/custom/GlobalEnum");
var UserBusiness_1 = __importDefault(require("../app/business/UserBusiness"));
function requireAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var authorization, audience, subject, encodedJWT, parts, header, payload, verifyOptions, publicKey, decoded, destinationResourceUrl, userBusiness, user, permissionParams, permissions, signInOptions, payload_1, privateKey, userToken, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    authorization = req.headers['authorization'] || '';
                    audience = '';
                    subject = '';
                    if (authorization === '' || typeof authorization === 'undefined') {
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 401,
                                message: 'You must be logged in to perform thus operation.'
                            }))];
                    }
                    encodedJWT = authorization.substr('JWT '.length);
                    parts = encodedJWT.split('.');
                    if (parts.length !== 3) {
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 400,
                                message: 'Token is invalid.'
                            }))];
                    }
                    header = JSON.parse(Buffer.from(parts[0], 'base64'));
                    payload = JSON.parse(Buffer.from(parts[1], 'base64'));
                    audience = payload.aud;
                    subject = payload.sub;
                    if (header.kid !== lib_1.currentAuthKey) {
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 400,
                                message: 'Token is invalid.'
                            }))];
                    }
                    if (payload.usage !== GlobalEnum_1.TokenType.AUTH) {
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 400,
                                message: 'Token is invalid.'
                            }))];
                    }
                    verifyOptions = {
                        issuer: payload.iss,
                        subject: payload.sub,
                        audience: payload.aud,
                        expiresIn: lib_1.authExpiration,
                        algorithms: [lib_1.currentRsaAlgType],
                        keyid: lib_1.currentAuthKey
                    };
                    publicKey = lib_1.getPublicKey(lib_1.currentAuthKey);
                    return [4 /*yield*/, jsonwebtoken_1.default.verify(encodedJWT, publicKey, verifyOptions)];
                case 1:
                    decoded = _a.sent();
                    if (!decoded) {
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 400,
                                message: 'Token is invalid.'
                            }))];
                    }
                    destinationResourceUrl = "" + lib_1.issuer + req.originalUrl;
                    if (destinationResourceUrl === payload.iss) {
                        req.user = {
                            id: payload.sub,
                            permissions: payload.permissions
                        };
                        return [2 /*return*/, next()];
                    }
                    userBusiness = new UserBusiness_1.default();
                    return [4 /*yield*/, userBusiness.findUserForExchange(payload.sub)];
                case 2:
                    user = _a.sent();
                    if (!user.data) return [3 /*break*/, 5];
                    permissionParams = {
                        destinationUrl: req.originalUrl.toLowerCase(),
                        roles: user.data.roles.slice()
                    };
                    return [4 /*yield*/, lib_1.tokenExchange(permissionParams)];
                case 3:
                    permissions = _a.sent();
                    signInOptions = {
                        issuer: destinationResourceUrl,
                        audience: audience,
                        expiresIn: lib_1.authExpiration,
                        algorithm: lib_1.currentRsaAlgType,
                        keyid: lib_1.currentAuthKey,
                        subject: subject
                    };
                    payload_1 = {
                        type: GlobalEnum_1.TokenType.AUTH
                    };
                    privateKey = lib_1.getSecretByKey(lib_1.currentAuthKey);
                    if (privateKey === '') {
                        return [2 /*return*/, next(new error_1.PlatformError({
                                code: 500,
                                message: 'Token is invalid'
                            }))];
                    }
                    return [4 /*yield*/, user.data.generateToken(privateKey, signInOptions, payload_1)];
                case 4:
                    userToken = _a.sent();
                    res.setHeader('authorization', userToken);
                    req.user = {
                        id: user.data._id,
                        permissions: permissions
                    };
                    return [2 /*return*/, next()];
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [2 /*return*/, next(new error_1.PlatformError({
                            code: 500,
                            message: err_1.message + ". Please generate another token."
                        }))];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.requireAuth = requireAuth;
//# sourceMappingURL=auth.js.map
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
var UserRepository_1 = __importDefault(require("../repository/UserRepository"));
var RoleRepository_1 = __importDefault(require("../repository/RoleRepository"));
var ScheduledEmailRepository_1 = __importDefault(require("../repository/ScheduledEmailRepository"));
var Result_1 = require("../../utils/Result");
var lib_1 = require("../../utils/lib");
var GlobalEnum_1 = require("../models/interfaces/custom/GlobalEnum");
var emailtemplates_1 = require("../../utils/emailtemplates");
var TemplatePlaceHolder_1 = require("../../utils/lib/TemplatePlaceHolder");
var config = require('../../config/keys');
var ScheduleEmail_1 = require("../../utils/emailservice/ScheduleEmail");
var UserBusiness = /** @class */ (function () {
    function UserBusiness() {
        this._userRepository = new UserRepository_1.default();
        this._roleRepository = new RoleRepository_1.default();
        this._scheduledEmailRepository = new ScheduledEmailRepository_1.default();
    }
    UserBusiness.prototype.login = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var user, passwordMatched, permissionParams, permissions, signInOptions, payload, privateKey, userToken, authData, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this._userRepository.findByCriteria({
                                email: params.email.toLowerCase()
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, Result_1.Result.fail(404, 'User not found.')];
                        return [4 /*yield*/, user.comparePassword(params.password)];
                    case 2:
                        passwordMatched = _a.sent();
                        if (!passwordMatched)
                            return [2 /*return*/, Result_1.Result.fail(400, 'Invalid credentials')];
                        permissionParams = {
                            destinationUrl: params.destinationUrl.toLowerCase(),
                            roles: user.roles.map(function (x) { return x._id; }).slice()
                        };
                        return [4 /*yield*/, lib_1.tokenExchange(permissionParams)];
                    case 3:
                        permissions = _a.sent();
                        signInOptions = {
                            issuer: config.ISSUER.toLowerCase(),
                            audience: params.audience,
                            expiresIn: config.AUTH_EXPIRESIN,
                            algorithm: config.RSA_ALG_TYPE,
                            keyid: config.RSA_KEYID,
                            subject: ''
                        };
                        payload = {
                            tokenType: GlobalEnum_1.TokenType.AUTH
                        };
                        privateKey = lib_1.getPrivateKey(config.RSA_KEYID);
                        if (!privateKey)
                            return [2 /*return*/, Result_1.Result.fail(400, 'The token key provided is invalid')];
                        return [4 /*yield*/, user.generateToken(privateKey, signInOptions, payload)];
                    case 4:
                        userToken = _a.sent();
                        authData = {
                            _id: user._id,
                            email: user.email,
                            roles: user.roles.map(function (role) { return role.name; }).slice(),
                            permissions: permissions,
                            token: userToken
                        };
                        return [2 /*return*/, Result_1.Result.ok(200, authData)];
                    case 5:
                        err_1 = _a.sent();
                        throw new Error("InternalServer error occured." + err_1.message);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserBusiness.prototype.fetch = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var refinedUsers, users, _i, users_1, user, userViewModel, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        refinedUsers = [];
                        return [4 /*yield*/, this._userRepository.fetch(condition)];
                    case 1:
                        users = _a.sent();
                        for (_i = 0, users_1 = users; _i < users_1.length; _i++) {
                            user = users_1[_i];
                            userViewModel = {
                                _id: user._id,
                                email: user.email,
                                name: user.username,
                                isEmailConfirmed: user.isEmailConfirmed,
                                isPhoneConfirmed: user.isPhoneConfirmed,
                                isProfileCompleted: user.isProfileCompleted,
                                generalNotification: user.generalNotification,
                                emailNotification: user.emailNotification,
                                profileVisibility: user.profileVisibility,
                                loginCount: user.loginCount,
                                status: [user.status],
                                roles: user.roles,
                                lastLogin: user.lastLogin,
                                createdAt: user.createdAt
                            };
                            refinedUsers = refinedUsers.concat([userViewModel]);
                        }
                        return [2 /*return*/, Result_1.Result.ok(200, refinedUsers)];
                    case 2:
                        err_2 = _a.sent();
                        throw new Error("InternalServer error occured." + err_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserBusiness.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, refinedUser, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userRepository.findById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, Result_1.Result.fail(404, "User with Id " + id + " not found")];
                        }
                        else {
                            refinedUser = {
                                _id: user._id,
                                email: user.email,
                                name: user.username,
                                isEmailConfirmed: user.isEmailConfirmed,
                                isPhoneConfirmed: user.isPhoneConfirmed,
                                isProfileCompleted: user.isProfileCompleted,
                                generalNotification: user.generalNotification,
                                emailNotification: user.emailNotification,
                                profileVisibility: user.profileVisibility,
                                loginCount: user.loginCount,
                                status: [user.status],
                                roles: user.roles,
                                lastLogin: user.lastLogin,
                                createdAt: user.createdAt
                            };
                            return [2 /*return*/, Result_1.Result.ok(200, refinedUser)];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        throw new Error("InternalServer error occured." + err_3.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserBusiness.prototype.findByCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var user, refinedUser, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userRepository.findByCriteria(criteria)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, Result_1.Result.fail(404, "User not found")];
                        }
                        else {
                            refinedUser = {
                                _id: user._id,
                                email: user.email,
                                name: user.username,
                                isEmailConfirmed: user.isEmailConfirmed,
                                isPhoneConfirmed: user.isPhoneConfirmed,
                                isProfileCompleted: user.isProfileCompleted,
                                generalNotification: user.generalNotification,
                                emailNotification: user.emailNotification,
                                profileVisibility: user.profileVisibility,
                                loginCount: user.loginCount,
                                status: [user.status],
                                roles: user.roles,
                                lastLogin: user.lastLogin,
                                createdAt: user.createdAt
                            };
                            return [2 /*return*/, Result_1.Result.ok(200, refinedUser)];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        throw new Error("InternalServer error occured." + err_4.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserBusiness.prototype.register = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var user, roleIds, _i, _a, key, role, newUser, tokenOptions, payload, privateKey, verificationToken, welcomeEmailKeyValues, welcomeTemplateString, welcomeEmailPlaceHolder, emailBody, mailParams, dueDate, schedule, err_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, this._userRepository.findByCriteria({
                                email: item.email
                            })];
                    case 1:
                        user = _b.sent();
                        if (user) {
                            return [2 /*return*/, Result_1.Result.fail(400, "There is a user registered with this email: " + item.email)];
                        }
                        roleIds = [];
                        _i = 0, _a = item.roles;
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        key = _a[_i];
                        return [4 /*yield*/, this._roleRepository.findByCriteria({
                                _id: lib_1.toObjectId(key),
                                isActive: true
                            })];
                    case 3:
                        role = _b.sent();
                        if (!role)
                            return [2 /*return*/, Result_1.Result.fail(400, "Role id " + key + " is not a valid role")];
                        roleIds.push(lib_1.toObjectId(key));
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, this._userRepository.register(item)];
                    case 6:
                        newUser = _b.sent();
                        tokenOptions = {
                            issuer: config.ISSUER.toLowerCase(),
                            audience: item.audience,
                            expiresIn: config.AUTH_EXPIRESIN,
                            algorithm: config.RSA_ALG_TYPE,
                            keyid: config.RSA_KEYID,
                            subject: ''
                        };
                        payload = {
                            tokenType: GlobalEnum_1.TokenType.MAIL
                        };
                        privateKey = lib_1.getPrivateKey(config.RSA_KEYID);
                        if (!privateKey)
                            return [2 /*return*/, Result_1.Result.fail(400, 'The token key provided is invalid')];
                        return [4 /*yield*/, newUser.generateToken(privateKey, tokenOptions, payload)];
                    case 7:
                        verificationToken = _b.sent();
                        welcomeEmailKeyValues = this.welcomeEmailKeyValue(newUser.username, item.audience, verificationToken);
                        welcomeTemplateString = emailtemplates_1.WelcomeEmail.template;
                        welcomeEmailPlaceHolder = {
                            template: welcomeTemplateString,
                            placeholders: welcomeEmailKeyValues
                        };
                        emailBody = TemplatePlaceHolder_1.replaceTemplateString(welcomeEmailPlaceHolder);
                        mailParams = {
                            receivers: [newUser.email],
                            subject: 'Signup Welcome Email',
                            body: emailBody,
                            senderEmail: 'talents@untappedpool.com',
                            senderName: 'Untapped Pool'
                        };
                        dueDate = newUser.createdAt;
                        return [4 /*yield*/, ScheduleEmail_1.scheduleEmail(dueDate, mailParams)];
                    case 8:
                        schedule = _b.sent();
                        console.log(schedule);
                        return [2 /*return*/, Result_1.Result.ok(201, true)];
                    case 9:
                        err_5 = _b.sent();
                        throw new Error("InternalServer error occured." + err_5);
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    UserBusiness.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var newUser, refinedUser, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userRepository.create(item)];
                    case 1:
                        newUser = _a.sent();
                        refinedUser = {
                            _id: newUser._id,
                            email: newUser.email,
                            name: newUser.username,
                            isEmailConfirmed: newUser.isEmailConfirmed,
                            isPhoneConfirmed: newUser.isPhoneConfirmed,
                            isProfileCompleted: newUser.isProfileCompleted,
                            generalNotification: newUser.generalNotification,
                            emailNotification: newUser.emailNotification,
                            profileVisibility: newUser.profileVisibility,
                            loginCount: newUser.loginCount,
                            status: [newUser.status],
                            roles: newUser.roles,
                            lastLogin: newUser.lastLogin,
                            createdAt: newUser.createdAt
                        };
                        return [2 /*return*/, Result_1.Result.ok(201, refinedUser)];
                    case 2:
                        err_6 = _a.sent();
                        throw new Error("InternalServer error occured." + err_6.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserBusiness.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var user, updateObj, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this._userRepository.findById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, Result_1.Result.fail(404, "Could not update user.User of Id " + id + " not found")];
                        return [4 /*yield*/, this._userRepository.update(user._id, item)];
                    case 2:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                    case 3:
                        err_7 = _a.sent();
                        throw new Error("InternalServer error occured." + err_7.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserBusiness.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isDeleted, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userRepository.delete(id)];
                    case 1:
                        isDeleted = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, isDeleted)];
                    case 2:
                        err_8 = _a.sent();
                        throw new Error("InternalServer error occured." + err_8.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserBusiness.prototype.welcomeEmailKeyValue = function (userName, audience, verificationUrl) {
        return [
            {
                key: TemplatePlaceHolder_1.PlaceHolderKey.Facebook,
                value: TemplatePlaceHolder_1.SocialMediaHandles.Facebook
            },
            {
                key: TemplatePlaceHolder_1.PlaceHolderKey.Instagram,
                value: TemplatePlaceHolder_1.SocialMediaHandles.Instagram
            },
            {
                key: TemplatePlaceHolder_1.PlaceHolderKey.Twitter,
                value: TemplatePlaceHolder_1.SocialMediaHandles.Twitter
            },
            {
                key: TemplatePlaceHolder_1.PlaceHolderKey.Name,
                value: userName
            },
            {
                key: TemplatePlaceHolder_1.PlaceHolderKey.VerificationUrl,
                value: verificationUrl
            },
            {
                key: TemplatePlaceHolder_1.PlaceHolderKey.PlatformUrl,
                value: audience
            }
        ];
    };
    return UserBusiness;
}());
Object.seal(UserBusiness);
module.exports = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map
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
var RolePermissionRepository_1 = __importDefault(require("../repository/RolePermissionRepository"));
var PermissionRepository_1 = __importDefault(require("../repository/PermissionRepository"));
var RefreshTokenRepository_1 = __importDefault(require("../repository/RefreshTokenRepository"));
var interfaces_1 = require("../models/interfaces");
var Result_1 = require("../../utils/Result");
var lib_1 = require("../../utils/lib");
var GlobalEnum_1 = require("../models/interfaces/custom/GlobalEnum");
var emailtemplates_1 = require("../../utils/emailtemplates");
var TemplatePlaceHolder_1 = require("../../utils/lib/TemplatePlaceHolder");
var config = require("../../config/keys");
var UserTypeRepository_1 = __importDefault(require("../repository/UserTypeRepository"));
var uuid_1 = __importDefault(require("uuid"));
var date_fns_1 = require("date-fns");
var MailBusiness_1 = require("./MailBusiness");
var UserBusiness = /** @class */ (function () {
    function UserBusiness() {
        this._currentAuthKey = "";
        this._currentVerifyKey = "";
        this._currentRsaAlgType = "";
        this._authExpiration = 0;
        this._mailExpiratation = 0;
        this._verifyExpiration = 0;
        this.chunkedUserPermissons = [];
        this._userRepository = new UserRepository_1.default();
        this._roleRepository = new RoleRepository_1.default();
        this._userTypeRepository = new UserTypeRepository_1.default();
        this._scheduledEmailRepository = new ScheduledEmailRepository_1.default();
        this._rolePermissionRepository = new RolePermissionRepository_1.default();
        this._permissionRepository = new PermissionRepository_1.default();
        this._currentAuthKey = lib_1.currentAuthKey;
        this._currentVerifyKey = lib_1.currentVerifyKey;
        this._currentRsaAlgType = lib_1.currentRsaAlgType;
        this._authExpiration = lib_1.authExpiration;
        this._verifyExpiration = lib_1.verifyTokenExpiration;
        this._mailExpiratation = lib_1.mailExpiration;
        this._refreshTokenRepository = new RefreshTokenRepository_1.default();
    }
    UserBusiness.prototype.findUserByEmail = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userRepository.findByCriteria(criteria)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserBusiness.prototype.refreshToken = function (userId, audience, refreshTokenParams) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error, _i, _a, role, permissions, signInOptions, payload, privateKey, typeOfUser, rfToken, newUserRefreshToken, userToken, tokenExpiration, authData;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.findById(userId)];
                    case 1:
                        user = _c.sent();
                        error = user.error ? user.error : "";
                        if (!user.data) return [3 /*break*/, 9];
                        if (!user.data.isEmailConfirmed)
                            return [2 /*return*/, Result_1.Result.fail(401, "Please verify your email.")];
                        _i = 0, _a = user.data.roles;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        role = _a[_i];
                        return [4 /*yield*/, this.fetchPermissionsByRole(role, user.data.userType)];
                    case 3:
                        permissions = _c.sent();
                        if (permissions) {
                            (_b = this.chunkedUserPermissons).push.apply(_b, permissions);
                        }
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        signInOptions = {
                            issuer: config.AUTH_ISSUER_SERVER,
                            audience: audience,
                            expiresIn: this._authExpiration + "h",
                            algorithm: this._currentRsaAlgType,
                            keyid: this._currentAuthKey,
                            subject: "",
                        };
                        payload = {
                            type: GlobalEnum_1.TokenType.AUTH,
                        };
                        privateKey = lib_1.getSecretByKey(this._currentAuthKey);
                        if (privateKey === "") {
                            return [2 /*return*/, Result_1.Result.fail(401, "Private Key is missing for " + this._currentAuthKey)];
                        }
                        return [4 /*yield*/, this._userTypeRepository.findById(user.data.userType)];
                    case 6:
                        typeOfUser = _c.sent();
                        rfToken = Object.assign({
                            token: uuid_1.default(),
                            application: refreshTokenParams.application,
                            ownerId: user.data._id,
                        });
                        return [4 /*yield*/, this._refreshTokenRepository.create(rfToken)];
                    case 7:
                        newUserRefreshToken = _c.sent();
                        return [4 /*yield*/, user.data.generateToken(privateKey, signInOptions, payload)];
                    case 8:
                        userToken = _c.sent();
                        tokenExpiration = date_fns_1.addHours(new Date(), this._authExpiration);
                        if (userToken.error)
                            return [2 /*return*/, Result_1.Result.fail(401, "Invalid token.")];
                        authData = {
                            access_token: userToken.data,
                            refresh_token: newUserRefreshToken.token,
                            rolePermissions: this.chunkedUserPermissons,
                            token_expires: tokenExpiration,
                            user_data: {
                                _id: user.data._id,
                                full_name: user.data.fullName,
                                email: user.data.email,
                                profile_is_completed: user.data.isProfileCompleted,
                                tap_notification: user.data.tapNotification,
                                email_notification: user.data.emailNotification,
                                profile_visibility: user.data.profileVisibility,
                                profile_image_path: user.data.profileImagePath || "",
                                banner_image_path: user.data.bannerImagePath || "",
                                userType: { _id: typeOfUser._id, name: typeOfUser.name },
                            },
                        };
                        return [2 /*return*/, Result_1.Result.ok(200, authData)];
                    case 9: return [2 /*return*/, Result_1.Result.fail(401, error)];
                }
            });
        });
    };
    UserBusiness.prototype.login = function (params, refreshTokenParams) {
        return __awaiter(this, void 0, void 0, function () {
            var criteria, user, passwordMatched, _i, _a, role, permissions, signInOptions, payload, privateKey, typeOfUser, userToken, tokenExpiration, authData;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        criteria = {
                            email: params.email.toLowerCase(),
                        };
                        return [4 /*yield*/, this.findUserByEmail(criteria)];
                    case 1:
                        user = _c.sent();
                        if (!user)
                            return [2 /*return*/, Result_1.Result.fail(401, "Invalid username/password")];
                        if (!(user.status === interfaces_1.AccountStatus.SUSPENDED)) return [3 /*break*/, 3];
                        user.status = interfaces_1.AccountStatus.ACTIVATED;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        // TODO:: ask around for what happens when an account is deleted
                        if (user.status === interfaces_1.AccountStatus.DELETED)
                            return [2 /*return*/, Result_1.Result.fail(401, "Invalid username/password")];
                        return [4 /*yield*/, user.comparePassword(params.password)];
                    case 4:
                        passwordMatched = _c.sent();
                        if (!passwordMatched)
                            return [2 /*return*/, Result_1.Result.fail(401, "Invalid username/password")];
                        if (!user.isEmailConfirmed)
                            return [2 /*return*/, Result_1.Result.fail(401, "Please verify your email.")];
                        _i = 0, _a = user.roles;
                        _c.label = 5;
                    case 5:
                        if (!(_i < _a.length)) return [3 /*break*/, 8];
                        role = _a[_i];
                        return [4 /*yield*/, this.fetchPermissionsByRole(role, user.userType)];
                    case 6:
                        permissions = _c.sent();
                        if (permissions) {
                            (_b = this.chunkedUserPermissons).push.apply(_b, permissions);
                        }
                        _c.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 5];
                    case 8:
                        signInOptions = {
                            issuer: config.AUTH_ISSUER_SERVER,
                            audience: params.audience,
                            expiresIn: this._authExpiration + "h",
                            algorithm: this._currentRsaAlgType,
                            keyid: this._currentAuthKey,
                            subject: "",
                        };
                        payload = {
                            type: GlobalEnum_1.TokenType.AUTH,
                        };
                        privateKey = lib_1.getSecretByKey(this._currentAuthKey);
                        if (privateKey === "") {
                            return [2 /*return*/, Result_1.Result.fail(401, "Private Key is missing for " + this._currentAuthKey)];
                        }
                        return [4 /*yield*/, this._userTypeRepository.findById(user.userType)];
                    case 9:
                        typeOfUser = _c.sent();
                        return [4 /*yield*/, user.generateToken(privateKey, signInOptions, payload)];
                    case 10:
                        userToken = _c.sent();
                        tokenExpiration = date_fns_1.addHours(new Date(), this._authExpiration);
                        if (userToken.error)
                            return [2 /*return*/, Result_1.Result.fail(401, "Invalid token.")];
                        authData = {
                            access_token: userToken.data,
                            refresh_token: uuid_1.default(),
                            rolePermissions: this.chunkedUserPermissons,
                            token_expires: tokenExpiration,
                            user_data: {
                                _id: user._id,
                                full_name: user.fullName,
                                email: user.email,
                                profile_is_completed: user.isProfileCompleted,
                                tap_notification: user.tapNotification,
                                email_notification: user.emailNotification,
                                profile_visibility: user.profileVisibility,
                                profile_image_path: user.profileImagePath || "",
                                banner_image_path: user.bannerImagePath || "",
                                userType: { _id: typeOfUser._id, name: typeOfUser.name },
                            },
                        };
                        return [2 /*return*/, Result_1.Result.ok(200, authData)];
                }
            });
        });
    };
    UserBusiness.prototype.confirmEmailChange = function (userId, request) {
        return __awaiter(this, void 0, void 0, function () {
            var unverifiedUser, publicKey, verifyOptions, decoded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userRepository.findById(userId)];
                    case 1:
                        unverifiedUser = _a.sent();
                        if (!unverifiedUser)
                            return [2 /*return*/, Result_1.Result.fail(404, "User not found.")];
                        publicKey = lib_1.getPublicKey(this._currentVerifyKey);
                        verifyOptions = {
                            issuer: config.VERIFICATION_URI,
                            algorithms: [this._currentRsaAlgType],
                            email: request.userEmail,
                            type: GlobalEnum_1.TokenType.VERIFY,
                            audience: request.audience,
                            keyid: this._currentVerifyKey,
                            expiresIn: this._mailExpiratation + "h",
                        };
                        return [4 /*yield*/, unverifiedUser.verifyToken(request.token, publicKey, verifyOptions)];
                    case 2:
                        decoded = _a.sent();
                        if (decoded.error)
                            return [2 /*return*/, Result_1.Result.fail(400, "" + decoded.error.split(".")[0])];
                        unverifiedUser.email = request.userEmail;
                        unverifiedUser.save();
                        return [2 /*return*/, Result_1.Result.ok(200, "Email successfully verified")];
                }
            });
        });
    };
    UserBusiness.prototype.confirmEmail = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var criteria, unverifiedUser, publicKey, verifyOptions, decoded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        criteria = {
                            email: request.userEmail.toLowerCase(),
                        };
                        return [4 /*yield*/, this.findUserByEmail(criteria)];
                    case 1:
                        unverifiedUser = _a.sent();
                        if (!unverifiedUser)
                            return [2 /*return*/, Result_1.Result.fail(404, "User not found.")];
                        if (unverifiedUser.isEmailConfirmed)
                            return [2 /*return*/, Result_1.Result.fail(400, unverifiedUser.email + " has already been verified.")];
                        publicKey = lib_1.getPublicKey(this._currentVerifyKey);
                        verifyOptions = {
                            issuer: config.VERIFICATION_URI,
                            algorithms: [this._currentRsaAlgType],
                            email: request.userEmail,
                            type: GlobalEnum_1.TokenType.VERIFY,
                            audience: request.audience,
                            keyid: this._currentVerifyKey,
                            expiresIn: this._mailExpiratation + "h",
                        };
                        return [4 /*yield*/, unverifiedUser.verifyToken(request.token, publicKey, verifyOptions)];
                    case 2:
                        decoded = _a.sent();
                        if (decoded.error)
                            return [2 /*return*/, Result_1.Result.fail(400, "" + decoded.error.split(".")[0])];
                        return [4 /*yield*/, this.updateUserIsEmailConfirmed(unverifiedUser._id, unverifiedUser)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, "Email successfully verified")];
                }
            });
        });
    };
    UserBusiness.prototype.updateUserIsEmailConfirmed = function (id, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user.isEmailConfirmed = true;
                        return [4 /*yield*/, this._userRepository.patch(id, { isEmailConfirmed: true })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserBusiness.prototype.fetch = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var refinedUsers, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refinedUsers = [];
                        return [4 /*yield*/, this._userRepository.fetch(condition)];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, users)];
                }
            });
        });
    };
    UserBusiness.prototype.findUserForExchange = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userRepository.findById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, Result_1.Result.fail(404, "User with Id " + id + " not found")];
                        }
                        else {
                            return [2 /*return*/, Result_1.Result.ok(200, user)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserBusiness.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userRepository.findById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, Result_1.Result.fail(404, "User not found")];
                        }
                        return [2 /*return*/, Result_1.Result.ok(200, user)];
                }
            });
        });
    };
    UserBusiness.prototype.findOne = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!condition)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request")];
                        return [4 /*yield*/, this._userRepository.findByOne(condition)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, Result_1.Result.fail(404, "User not found")];
                        }
                        else {
                            return [2 /*return*/, Result_1.Result.ok(200, user)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserBusiness.prototype.findByCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userRepository.findByCriteria(criteria)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, Result_1.Result.fail(404, "User not found")];
                        }
                        else {
                            return [2 /*return*/, Result_1.Result.ok(200, user)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserBusiness.prototype.registerAdmin = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isUserTypeValid, userType, _i, _a, role, roleResult, newUser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._userRepository.findByCriteria({
                            email: item.email,
                        })];
                    case 1:
                        user = _b.sent();
                        if (user) {
                            return [2 /*return*/, Result_1.Result.fail(409, "There is a user registered with this email: " + item.email)];
                        }
                        isUserTypeValid = lib_1.validateObjectId(item.userType);
                        if (!isUserTypeValid) {
                            return [2 /*return*/, Result_1.Result.fail(400, "Invalid UserType")];
                        }
                        return [4 /*yield*/, this._userTypeRepository.findById(item.userType)];
                    case 2:
                        userType = _b.sent();
                        if (userType === null)
                            return [2 /*return*/, Result_1.Result.fail(400, "UserType not found")];
                        if (!userType.isAdmin)
                            return [2 /*return*/, Result_1.Result.fail(400, "Invalid UserType")];
                        _i = 0, _a = item.roles;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        role = _a[_i];
                        return [4 /*yield*/, this._roleRepository.findById(role)];
                    case 4:
                        roleResult = _b.sent();
                        if (!roleResult)
                            return [2 /*return*/, Result_1.Result.fail(404, "Role " + role + " not found")];
                        if (!roleResult.isActive)
                            return [2 /*return*/, Result_1.Result.fail(400, "Role " + role + " not activated")];
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        item.isEmailConfirmed = true;
                        item.isProfileCompleted = true;
                        return [4 /*yield*/, this._userRepository.registerAdmin(item)];
                    case 7:
                        newUser = _b.sent();
                        return [2 /*return*/, Result_1.Result.ok(201, true)];
                }
            });
        });
    };
    UserBusiness.prototype.register = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isUserTypeValid, userType, defaultRole, newUser, data, token, welcomeEmailKeyValues, welcomeTemplateString, welcomeEmailPlaceHolder, emailBody, recievers, mailer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userRepository.findByCriteria({
                            email: item.email,
                        })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            return [2 /*return*/, Result_1.Result.fail(409, "There is a user registered with this email: " + item.email)];
                        }
                        isUserTypeValid = lib_1.validateObjectId(item.userType);
                        if (!isUserTypeValid) {
                            return [2 /*return*/, Result_1.Result.fail(400, "Invalid UserType")];
                        }
                        return [4 /*yield*/, this._userTypeRepository.findById(item.userType)];
                    case 2:
                        userType = _a.sent();
                        if (userType === null) {
                            return [2 /*return*/, Result_1.Result.fail(400, "UserType not found")];
                        }
                        if (userType.isAdmin)
                            return [2 /*return*/, Result_1.Result.fail(400, "User can't be assigned userType")];
                        return [4 /*yield*/, this._roleRepository.findByCriteria({
                                isDefault: true,
                                isActive: true,
                            })];
                    case 3:
                        defaultRole = _a.sent();
                        if (defaultRole === null) {
                            return [2 /*return*/, Result_1.Result.fail(400, "No role has been assigned yet.")];
                        }
                        item.roles.push(defaultRole._id);
                        return [4 /*yield*/, this._userRepository.register(item)];
                    case 4:
                        newUser = _a.sent();
                        data = {
                            user: newUser,
                            audience: item.audience,
                            tokenExpiresIn: this._mailExpiratation + "h",
                            tokenType: GlobalEnum_1.TokenType.VERIFY,
                            redirectUrl: item.confirmationUrl,
                        };
                        return [4 /*yield*/, this.generateToken(data)];
                    case 5:
                        token = _a.sent();
                        if (!token.data) return [3 /*break*/, 7];
                        welcomeEmailKeyValues = this.TokenEmailKeyValue(newUser.fullName, item.audience, item.confirmationUrl + "/" + newUser.email + "/" + token.data);
                        welcomeTemplateString = emailtemplates_1.WelcomeEmail.template;
                        welcomeEmailPlaceHolder = {
                            template: welcomeTemplateString,
                            placeholders: welcomeEmailKeyValues,
                        };
                        emailBody = TemplatePlaceHolder_1.replaceTemplateString(welcomeEmailPlaceHolder);
                        recievers = [newUser.email];
                        mailer = MailBusiness_1.MailBusiness.init();
                        return [4 /*yield*/, mailer.sendMail("Oluwakemi (CEO, UntappedPool) <" + config.UNTAPPED_CEO_EMAIL + ">", "UntappedPool Competitions", recievers, "\uD83D\uDC4Bhi " + newUser.fullName + "!", emailBody)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/, Result_1.Result.ok(201, true)];
                }
            });
        });
    };
    UserBusiness.prototype.forgotPassword = function (email, audience, redirectUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var user, request, token, forgorPasswordEmailKeyValues, forgoPasswordTemplateString, forgotPasswordEmailPlaceHolder, emailBody, recievers, mailer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userRepository.findByCriteria({
                            email: email,
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 6];
                        request = {
                            user: user,
                            audience: audience,
                            tokenExpiresIn: this._mailExpiratation + "h",
                            tokenType: GlobalEnum_1.TokenType.VERIFY,
                            redirectUrl: redirectUrl,
                        };
                        return [4 /*yield*/, this.generateToken(request)];
                    case 2:
                        token = _a.sent();
                        if (!token.data) return [3 /*break*/, 4];
                        forgorPasswordEmailKeyValues = this.TokenEmailKeyValue(user.fullName, audience, redirectUrl + "/" + user.email + "/" + token.data);
                        forgoPasswordTemplateString = emailtemplates_1.ForgotPasswordEmail.template;
                        forgotPasswordEmailPlaceHolder = {
                            template: forgoPasswordTemplateString,
                            placeholders: forgorPasswordEmailKeyValues,
                        };
                        emailBody = TemplatePlaceHolder_1.replaceTemplateString(forgotPasswordEmailPlaceHolder);
                        recievers = [user.email];
                        mailer = MailBusiness_1.MailBusiness.init();
                        return [4 /*yield*/, mailer.sendMail("UntappedPool <" + config.UNTAPPED_ADMIN_EMAIL + ">", "Untappedpool.com", recievers, "Reset password instructions", emailBody)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        user.passwordResetRequested = true;
                        return [4 /*yield*/, user.save()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, Result_1.Result.ok(200, "If an account exist for " + email + ", you will receive password reset instructions.")];
                }
            });
        });
    };
    UserBusiness.prototype.verifyPasswordResetLink = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var criteria, unverifiedUser, publicKey, verifyOptions, decoded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        criteria = {
                            email: request.email.toLowerCase(),
                        };
                        return [4 /*yield*/, this.findUserByEmail(criteria)];
                    case 1:
                        unverifiedUser = _a.sent();
                        if (!unverifiedUser)
                            return [2 /*return*/, Result_1.Result.fail(404, "User not found.")];
                        if (!unverifiedUser.isEmailConfirmed)
                            return [2 /*return*/, Result_1.Result.fail(400, "Please verify email.")];
                        publicKey = lib_1.getPublicKey(this._currentVerifyKey);
                        verifyOptions = {
                            issuer: config.VERIFICATION_URI,
                            algorithms: [this._currentRsaAlgType],
                            email: request.email,
                            type: GlobalEnum_1.TokenType.VERIFY,
                            audience: request.audience,
                            keyid: this._currentVerifyKey,
                            expiresIn: this._mailExpiratation + "h",
                        };
                        return [4 /*yield*/, unverifiedUser.verifyToken(request.token, publicKey, verifyOptions)];
                    case 2:
                        decoded = _a.sent();
                        if (decoded.error)
                            return [2 /*return*/, Result_1.Result.fail(400, "" + decoded.error.split(".")[0])];
                        return [2 /*return*/, Result_1.Result.ok(200, "Forgot password request has been verified")];
                }
            });
        });
    };
    UserBusiness.prototype.resetPassword = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userRepository.findByCriteria({
                            email: data.email,
                            isEmailConfirmed: true,
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, Result_1.Result.fail(400, "User not found")];
                        if (!user.passwordResetRequested) {
                            return [2 /*return*/, Result_1.Result.fail(400, "Invalid request, you have not requested password reset.")];
                        }
                        user.password = data.newPassword;
                        user.passwordResetRequested = false;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, "Password successfully reset")];
                }
            });
        });
    };
    UserBusiness.prototype.changeEmail = function (userId, newEmail, audience, redirectUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var user, userExist, request, token, changeEmailKeyValues, changeEmailTemplateString, changeEmailPlaceHolder, emailBody, recievers, mailer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userRepository.findById(userId)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, Result_1.Result.fail(404, "User not found.")];
                        return [4 /*yield*/, this._userRepository.findByCriteria({
                                email: newEmail,
                            })];
                    case 2:
                        userExist = _a.sent();
                        if (userExist)
                            return [2 /*return*/, Result_1.Result.fail(400, "There is a user registered with this email: " + newEmail)];
                        request = {
                            user: user,
                            audience: audience,
                            tokenExpiresIn: this._mailExpiratation + "h",
                            tokenType: GlobalEnum_1.TokenType.VERIFY,
                            redirectUrl: redirectUrl,
                        };
                        return [4 /*yield*/, this.generateToken(request)];
                    case 3:
                        token = _a.sent();
                        if (!token.data) return [3 /*break*/, 5];
                        changeEmailKeyValues = this.TokenEmailKeyValue(user.fullName, audience, redirectUrl + "/" + newEmail + "/" + token.data);
                        changeEmailTemplateString = emailtemplates_1.ChangeEmail.template;
                        changeEmailPlaceHolder = {
                            template: changeEmailTemplateString,
                            placeholders: changeEmailKeyValues,
                        };
                        emailBody = TemplatePlaceHolder_1.replaceTemplateString(changeEmailPlaceHolder);
                        recievers = [newEmail];
                        mailer = MailBusiness_1.MailBusiness.init();
                        return [4 /*yield*/, mailer.sendMail("UntappedPool <" + config.UNTAPPED_ADMIN_EMAIL + ">", "Untappedpool.com", recievers, "Verify Your Email Address", emailBody)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, Result_1.Result.ok(200, true)];
                }
            });
        });
    };
    UserBusiness.prototype.changePassword = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var user, passwordMatched;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userRepository.findByCriteria({
                            _id: data.userId,
                            isEmailConfirmed: true,
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, Result_1.Result.fail(400, "User not found")];
                        if (user._id !== data.userId)
                            Result_1.Result.fail(403, "You are not authourized to make this request.");
                        return [4 /*yield*/, user.comparePassword(data.oldPassword)];
                    case 2:
                        passwordMatched = _a.sent();
                        if (!passwordMatched)
                            return [2 /*return*/, Result_1.Result.fail(400, "Password is incorrect.")];
                        user.password = data.newPassword;
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, true)];
                }
            });
        });
    };
    UserBusiness.prototype.resendVerificationLink = function (email, audience, verificationUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var user, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userRepository.findByCriteria({
                            email: email,
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, Result_1.Result.fail(400, "Invalid username/password")];
                        }
                        if (user.isEmailConfirmed)
                            return [2 /*return*/, Result_1.Result.fail(400, user.email + " has already been verified.")];
                        data = {
                            user: user,
                            audience: audience,
                            tokenExpiresIn: this._mailExpiratation + "h",
                            tokenType: GlobalEnum_1.TokenType.VERIFY,
                            redirectUrl: verificationUrl,
                        };
                        this.generateToken(data);
                        return [2 /*return*/, Result_1.Result.ok(200, true)];
                }
            });
        });
    };
    UserBusiness.prototype.generateToken = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenOptions, payload, privateKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tokenOptions = {
                            issuer: config.VERIFICATION_URI,
                            audience: data.audience,
                            expiresIn: data.tokenExpiresIn,
                            algorithm: this._currentRsaAlgType,
                            keyid: this._currentVerifyKey,
                            subject: "",
                        };
                        payload = {
                            type: data.tokenType,
                            email: data.user.email,
                        };
                        privateKey = lib_1.getSecretByKey(this._currentVerifyKey);
                        return [4 /*yield*/, data.user.generateToken(privateKey, tokenOptions, payload)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserBusiness.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userRepository.create(item)];
                    case 1:
                        newUser = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(201, newUser)];
                }
            });
        });
    };
    UserBusiness.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var user, updateObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userRepository.findById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, Result_1.Result.fail(404, "User not found")];
                        item.isEmailConfirmed = user.isEmailConfirmed;
                        item.isProfileCompleted = user.isProfileCompleted;
                        item.status = user.status;
                        item.userType = user.userType;
                        item.email = user.email;
                        item.isPhoneConfirmed = user.isPhoneConfirmed;
                        item.lastLogin = user.lastLogin;
                        item.createdAt = user.createdAt;
                        item._id = user._id;
                        item.password = user.password;
                        item.userType = user.userType;
                        item.status = user.status;
                        item.roles = user.roles.slice();
                        return [4 /*yield*/, this._userRepository.update(user._id, item)];
                    case 2:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                }
            });
        });
    };
    UserBusiness.prototype.updateUserProfileStatus = function (id, audience) {
        return __awaiter(this, void 0, void 0, function () {
            var user, updateObj, profileActivatedKeyValues, profileActivatedTemplateString, profileActivatedPlaceHolder, emailBody, recievers, mailer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userRepository.findById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, Result_1.Result.fail(404, "User not found")];
                        return [4 /*yield*/, this._userRepository.patch(user._id, {
                                isProfileCompleted: true,
                            })];
                    case 2:
                        updateObj = _a.sent();
                        profileActivatedKeyValues = this.UserWalletKeyValue(user.fullName, audience + "/user/" + user.email.split("@")[0] + "?tab=wallet");
                        profileActivatedTemplateString = emailtemplates_1.ProfileActived.template;
                        profileActivatedPlaceHolder = {
                            template: profileActivatedTemplateString,
                            placeholders: profileActivatedKeyValues,
                        };
                        emailBody = TemplatePlaceHolder_1.replaceTemplateString(profileActivatedPlaceHolder);
                        recievers = [user.email];
                        mailer = MailBusiness_1.MailBusiness.init();
                        return [4 /*yield*/, mailer.sendMail("Seyifunmi from UntappedPool <" + config.UNTAPPED_ADMIN_EMAIL + ">", "Your profile is live", recievers, "Your profile is live on www.untappedpool.com", emailBody)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                }
            });
        });
    };
    UserBusiness.prototype.updateUserStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, updateObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userRepository.findById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, Result_1.Result.fail(404, "User not found")];
                        return [4 /*yield*/, this._userRepository.patch(user._id, {
                                status: interfaces_1.AccountStatus.SUSPENDED,
                            })];
                    case 2:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                }
            });
        });
    };
    UserBusiness.prototype.patch = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var user, updateObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userRepository.findById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, Result_1.Result.fail(404, "User not found")];
                        item.isEmailConfirmed = user.isEmailConfirmed;
                        item.isProfileCompleted = user.isProfileCompleted;
                        item.status = user.status;
                        item.userType = user.userType;
                        item.email = user.email;
                        item.isPhoneConfirmed = user.isPhoneConfirmed;
                        item.lastLogin = user.lastLogin;
                        item.createdAt = user.createdAt;
                        item._id = user._id;
                        item.password = user.password;
                        item.userType = user.userType;
                        item.status = user.status;
                        item.roles = user.roles.slice();
                        return [4 /*yield*/, this._userRepository.patch(user._id, item)];
                    case 2:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                }
            });
        });
    };
    UserBusiness.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isDeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userRepository.delete(id)];
                    case 1:
                        isDeleted = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, isDeleted)];
                }
            });
        });
    };
    UserBusiness.prototype.TokenEmailKeyValue = function (userName, audience, verificationUrl) {
        return [
            {
                key: TemplatePlaceHolder_1.PlaceHolderKey.Facebook,
                value: TemplatePlaceHolder_1.SocialMediaHandles.Facebook,
            },
            {
                key: TemplatePlaceHolder_1.PlaceHolderKey.Instagram,
                value: TemplatePlaceHolder_1.SocialMediaHandles.Instagram,
            },
            {
                key: TemplatePlaceHolder_1.PlaceHolderKey.Twitter,
                value: TemplatePlaceHolder_1.SocialMediaHandles.Twitter,
            },
            {
                key: TemplatePlaceHolder_1.PlaceHolderKey.Name,
                value: userName,
            },
            {
                key: TemplatePlaceHolder_1.PlaceHolderKey.VerifyToken,
                value: verificationUrl,
            },
            {
                key: TemplatePlaceHolder_1.PlaceHolderKey.PlatformUrl,
                value: audience,
            },
            {
                key: TemplatePlaceHolder_1.PlaceHolderKey.FullVerifyToken,
                value: verificationUrl,
            },
        ];
    };
    UserBusiness.prototype.UserWalletKeyValue = function (fullName, userWalletUrl) {
        return [
            {
                key: TemplatePlaceHolder_1.PlaceHolderKey.Name,
                value: fullName,
            },
            {
                key: TemplatePlaceHolder_1.PlaceHolderKey.UserWalletUrl,
                value: userWalletUrl,
            },
        ];
    };
    // async fetchResourceByName(destinationUrl: string): Promise<IResource> {
    //   return await this._resourceRepository.findByCriteria({
    //     name: destinationUrl
    //   });
    // }
    UserBusiness.prototype.fetchPermissionsByRole = function (role, userType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._rolePermissionRepository.populateFetch("permission", {
                            role: role,
                            userType: userType,
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UserBusiness;
}());
Object.seal(UserBusiness);
module.exports = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map
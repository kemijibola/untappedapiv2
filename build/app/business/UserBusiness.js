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
var ResourceRepository_1 = __importDefault(require("../repository/ResourceRepository"));
var PermissionRepository_1 = __importDefault(require("../repository/PermissionRepository"));
var Result_1 = require("../../utils/Result");
var lib_1 = require("../../utils/lib");
var GlobalEnum_1 = require("../models/interfaces/custom/GlobalEnum");
var emailtemplates_1 = require("../../utils/emailtemplates");
var TemplatePlaceHolder_1 = require("../../utils/lib/TemplatePlaceHolder");
var config = require("../../config/keys");
// import { scheduleEmail } from '../../utils/emailservice/ScheduleEmail';
var ScheduleTask_1 = require("../../handlers/ScheduleTask");
var StateMachineArns_1 = require("../models/interfaces/custom/StateMachineArns");
var UserTypeRepository_1 = __importDefault(require("../repository/UserTypeRepository"));
var UserBusiness = /** @class */ (function () {
    function UserBusiness() {
        this._currentAuthKey = "";
        this._currentVerifyKey = "";
        this._currentRsaAlgType = "";
        this._authExpiration = "";
        this._mailExpiratation = "";
        this._verifyExpiration = "";
        this.chunkedUserPermissons = [];
        this._userRepository = new UserRepository_1.default();
        this._roleRepository = new RoleRepository_1.default();
        this._userTypeRepository = new UserTypeRepository_1.default();
        this._scheduledEmailRepository = new ScheduledEmailRepository_1.default();
        this._resourceRepository = new ResourceRepository_1.default();
        this._permissionRepository = new PermissionRepository_1.default();
        this._currentAuthKey = lib_1.currentAuthKey;
        this._currentVerifyKey = lib_1.currentVerifyKey;
        this._currentRsaAlgType = lib_1.currentRsaAlgType;
        this._authExpiration = lib_1.authExpiration;
        this._verifyExpiration = lib_1.verifyTokenExpiration;
        this._mailExpiratation = lib_1.mailExpiration;
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
    UserBusiness.prototype.login = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var criteria, user, passwordMatched, _i, _a, role, permissions, signInOptions, payload, privateKey, userToken, typeOfUser, authData;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        criteria = {
                            email: params.email.toLowerCase()
                        };
                        return [4 /*yield*/, this.findUserByEmail(criteria)];
                    case 1:
                        user = _c.sent();
                        if (!user)
                            return [2 /*return*/, Result_1.Result.fail(401, "Invalid username/password")];
                        return [4 /*yield*/, user.comparePassword(params.password)];
                    case 2:
                        passwordMatched = _c.sent();
                        if (!passwordMatched)
                            return [2 /*return*/, Result_1.Result.fail(401, "Invalid credentials")];
                        if (!user.isEmailConfirmed)
                            return [2 /*return*/, Result_1.Result.fail(401, "Please verify your email.")];
                        _i = 0, _a = user.roles;
                        _c.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        role = _a[_i];
                        return [4 /*yield*/, this.fetchPermissionsByRole(role)];
                    case 4:
                        permissions = _c.sent();
                        if (permissions) {
                            (_b = this.chunkedUserPermissons).push.apply(_b, permissions);
                        }
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        signInOptions = {
                            issuer: config.AUTH_ISSUER_SERVER,
                            audience: params.audience,
                            expiresIn: this._authExpiration,
                            algorithm: this._currentRsaAlgType,
                            keyid: this._currentAuthKey,
                            subject: ""
                        };
                        payload = {
                            type: GlobalEnum_1.TokenType.AUTH
                        };
                        privateKey = lib_1.getSecretByKey(this._currentAuthKey);
                        if (privateKey === "") {
                            return [2 /*return*/, Result_1.Result.fail(401, "Private Key is missing for " + this._currentAuthKey)];
                        }
                        return [4 /*yield*/, user.generateToken(privateKey, signInOptions, payload)];
                    case 7:
                        userToken = _c.sent();
                        if (userToken.error)
                            return [2 /*return*/, Result_1.Result.fail(401, "Invalid token.")];
                        return [4 /*yield*/, this._userTypeRepository.findById(user.userType)];
                    case 8:
                        typeOfUser = _c.sent();
                        authData = {
                            access_token: userToken.data,
                            permissions: this.chunkedUserPermissons,
                            user_data: {
                                _id: user._id,
                                full_name: user.fullName,
                                email: user.email,
                                profile_is_completed: user.isProfileCompleted,
                                profile_image_path: user.profileImagePath || "",
                                userType: { _id: typeOfUser._id, name: typeOfUser.name }
                            }
                        };
                        return [2 /*return*/, Result_1.Result.ok(200, authData)];
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
                            email: request.userEmail.toLowerCase()
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
                            expiresIn: this._mailExpiratation
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
            var refinedUsers, users, _i, users_1, user, userViewModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refinedUsers = [];
                        return [4 /*yield*/, this._userRepository.fetch(condition)];
                    case 1:
                        users = _a.sent();
                        for (_i = 0, users_1 = users; _i < users_1.length; _i++) {
                            user = users_1[_i];
                            userViewModel = {
                                _id: user._id,
                                email: user.email,
                                fullName: user.fullName,
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
            var user, refinedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request")];
                        return [4 /*yield*/, this._userRepository.findById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, Result_1.Result.fail(404, "User not found")];
                        }
                        else {
                            refinedUser = {
                                _id: user._id,
                                email: user.email,
                                fullName: user.fullName,
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
                        return [2 /*return*/];
                }
            });
        });
    };
    UserBusiness.prototype.findOne = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var user, refinedUser;
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
                            refinedUser = {
                                _id: user._id,
                                email: user.email,
                                fullName: user.fullName,
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
                        return [2 /*return*/];
                }
            });
        });
    };
    UserBusiness.prototype.findByCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var user, refinedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userRepository.findByCriteria(criteria)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, Result_1.Result.fail(404, "User not found")];
                        }
                        else {
                            refinedUser = {
                                _id: user._id,
                                email: user.email,
                                fullName: user.fullName,
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
                        return [2 /*return*/];
                }
            });
        });
    };
    UserBusiness.prototype.register = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isUserTypeValid, userType, defaultRole, newUser, data, token, welcomeEmailKeyValues, welcomeTemplateString, welcomeEmailPlaceHolder, emailBody, recievers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userRepository.findByCriteria({
                            email: item.email
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
                        return [4 /*yield*/, this._roleRepository.findByCriteria({
                                isDefault: true,
                                isActive: true
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
                            tokenExpiresIn: this._mailExpiratation,
                            tokenType: GlobalEnum_1.TokenType.VERIFY,
                            redirectUrl: item.confirmationUrl
                        };
                        return [4 /*yield*/, this.generateToken(data)];
                    case 5:
                        token = _a.sent();
                        if (!token.data) return [3 /*break*/, 7];
                        welcomeEmailKeyValues = this.TokenEmailKeyValue(newUser.fullName, item.audience, item.confirmationUrl + "?email=" + newUser.email + "&token=" + token.data);
                        welcomeTemplateString = emailtemplates_1.WelcomeEmail.template;
                        welcomeEmailPlaceHolder = {
                            template: welcomeTemplateString,
                            placeholders: welcomeEmailKeyValues
                        };
                        emailBody = TemplatePlaceHolder_1.replaceTemplateString(welcomeEmailPlaceHolder);
                        recievers = [newUser.email];
                        return [4 /*yield*/, this.sendMail(recievers, "SignUp Welcome Email", emailBody)];
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
            var user, request, token, forgorPasswordEmailKeyValues, forgoPasswordTemplateString, forgotPasswordEmailPlaceHolder, emailBody, recievers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userRepository.findByCriteria({
                            email: email
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 4];
                        request = {
                            user: user,
                            audience: audience,
                            tokenExpiresIn: this._mailExpiratation,
                            tokenType: GlobalEnum_1.TokenType.VERIFY,
                            redirectUrl: redirectUrl
                        };
                        return [4 /*yield*/, this.generateToken(request)];
                    case 2:
                        token = _a.sent();
                        if (!token.data) return [3 /*break*/, 4];
                        console.log(token.data);
                        forgorPasswordEmailKeyValues = this.TokenEmailKeyValue(user.fullName, audience, redirectUrl + "?email=" + user.email + "&token=" + token.data);
                        forgoPasswordTemplateString = emailtemplates_1.ForgotPasswordEmail.template;
                        forgotPasswordEmailPlaceHolder = {
                            template: forgoPasswordTemplateString,
                            placeholders: forgorPasswordEmailKeyValues
                        };
                        emailBody = TemplatePlaceHolder_1.replaceTemplateString(forgotPasswordEmailPlaceHolder);
                        recievers = [user.email];
                        return [4 /*yield*/, this.sendMail(recievers, "Reset Your Password", emailBody)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        user.passwordResetRequested = true;
                        user.save();
                        return [2 /*return*/, Result_1.Result.ok(200, "Reset password link has been sent successfully.")];
                }
            });
        });
    };
    UserBusiness.prototype.sendMail = function (receivers, subject, mailBody) {
        return __awaiter(this, void 0, void 0, function () {
            var mailParams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mailParams = {
                            receivers: receivers.slice(),
                            subject: subject,
                            mail: mailBody,
                            senderEmail: "talents@untappedpool.com",
                            senderName: "Untapped Pool"
                        };
                        return [4 /*yield*/, ScheduleTask_1.schedule(StateMachineArns_1.StateMachineArns.EmailStateMachine, new Date(), mailParams)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
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
                            email: request.email.toLowerCase()
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
                            expiresIn: this._mailExpiratation
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
                            isEmailConfirmed: true
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
                        user.save();
                        return [2 /*return*/, Result_1.Result.ok(200, "Password successfully reset")];
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
                            isEmailConfirmed: true
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
                        user.save();
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
                            email: email
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
                            tokenExpiresIn: this._mailExpiratation,
                            tokenType: GlobalEnum_1.TokenType.VERIFY,
                            redirectUrl: verificationUrl
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
                            subject: ""
                        };
                        payload = {
                            type: data.tokenType,
                            email: data.user.email
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
            var newUser, refinedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userRepository.create(item)];
                    case 1:
                        newUser = _a.sent();
                        refinedUser = {
                            _id: newUser._id,
                            email: newUser.email,
                            fullName: newUser.fullName,
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
                            return [2 /*return*/, Result_1.Result.fail(404, "Could not update user.User of Id " + id + " not found")];
                        return [4 /*yield*/, this._userRepository.update(user._id, item)];
                    case 2:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                }
            });
        });
    };
    UserBusiness.prototype.patch = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var user, updateObj, refinedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._userRepository.findById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, Result_1.Result.fail(404, "Could not update user.User with Id " + id + " not found")];
                        return [4 /*yield*/, this._userRepository.update(user._id, item)];
                    case 2:
                        updateObj = _a.sent();
                        refinedUser = {
                            _id: updateObj._id,
                            email: updateObj.email,
                            fullName: updateObj.fullName,
                            profileImagePath: updateObj.profileImagePath,
                            isEmailConfirmed: updateObj.isEmailConfirmed,
                            isPhoneConfirmed: updateObj.isPhoneConfirmed,
                            isProfileCompleted: updateObj.isProfileCompleted,
                            generalNotification: updateObj.generalNotification,
                            emailNotification: updateObj.emailNotification,
                            profileVisibility: updateObj.profileVisibility,
                            loginCount: updateObj.loginCount,
                            status: [updateObj.status],
                            roles: updateObj.roles,
                            lastLogin: updateObj.lastLogin,
                            createdAt: updateObj.createdAt
                        };
                        return [2 /*return*/, Result_1.Result.ok(200, refinedUser)];
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
                key: TemplatePlaceHolder_1.PlaceHolderKey.VerifyToken,
                value: verificationUrl
            },
            {
                key: TemplatePlaceHolder_1.PlaceHolderKey.PlatformUrl,
                value: audience
            },
            {
                key: TemplatePlaceHolder_1.PlaceHolderKey.FullVerifyToken,
                value: verificationUrl
            }
        ];
    };
    UserBusiness.prototype.fetchResourceByName = function (destinationUrl) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._resourceRepository.findByCriteria({
                            name: destinationUrl
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserBusiness.prototype.fetchPermissionsByRole = function (role) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._permissionRepository.fetch({ role: role })];
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
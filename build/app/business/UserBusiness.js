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
var ResourcePermissionRepository_1 = __importDefault(require("../repository/ResourcePermissionRepository"));
var PermissionRepository_1 = __importDefault(require("../repository/PermissionRepository"));
var Result_1 = require("../../utils/Result");
var lib_1 = require("../../utils/lib");
var GlobalEnum_1 = require("../models/interfaces/custom/GlobalEnum");
var emailtemplates_1 = require("../../utils/emailtemplates");
var TemplatePlaceHolder_1 = require("../../utils/lib/TemplatePlaceHolder");
var config = require('../../config/keys');
var TaskScheduler_1 = require("../../utils/TaskScheduler");
var StateMachineArns_1 = require("../models/interfaces/custom/StateMachineArns");
var error_1 = require("../../utils/error");
var UserBusiness = /** @class */ (function () {
    function UserBusiness() {
        this._currentAuthKey = '';
        this._currentVerifyKey = '';
        this._currentRsaAlgType = '';
        this._authExpiration = '';
        this._verifyExpiration = '';
        this.chunkedUserPermissons = {};
        this._userRepository = new UserRepository_1.default();
        this._roleRepository = new RoleRepository_1.default();
        this._scheduledEmailRepository = new ScheduledEmailRepository_1.default();
        this._resourceRepository = new ResourceRepository_1.default();
        this._resourcePermissionRepository = new ResourcePermissionRepository_1.default();
        this._permissionRepository = new PermissionRepository_1.default();
        this._currentAuthKey = lib_1.currentAuthKey;
        this._currentVerifyKey = lib_1.currentVerifyKey;
        this._currentRsaAlgType = lib_1.currentRsaAlgType;
        this._authExpiration = lib_1.authExpiration;
        this._verifyExpiration = lib_1.verifyTokenExpiration;
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
            var criteria, user, passwordMatched, resource, permissions, signInOptions, payload, privateKey, userToken, authData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        criteria = {
                            email: params.email.toLowerCase()
                        };
                        return [4 /*yield*/, this.findUserByEmail(criteria)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, Result_1.Result.fail(404, 'User not found.')];
                        return [4 /*yield*/, user.comparePassword(params.password)];
                    case 2:
                        passwordMatched = _a.sent();
                        if (!passwordMatched)
                            return [2 /*return*/, Result_1.Result.fail(400, 'Invalid credentials')];
                        if (!user.isEmailConfirmed)
                            return [2 /*return*/, Result_1.Result.fail(400, 'Please verify your email.')];
                        return [4 /*yield*/, this.fetchResourceByName(params.destinationUrl.toLowerCase())];
                    case 3:
                        resource = _a.sent();
                        if (resource === null)
                            throw new error_1.PlatformError({
                                code: 404,
                                message: "Route: " + params.destinationUrl.toLowerCase() + " is not configured."
                            });
                        return [4 /*yield*/, this.fetchRolePermissionByResourceId(user.roles, resource._id)];
                    case 4:
                        permissions = _a.sent();
                        signInOptions = {
                            issuer: params.issuer,
                            audience: params.audience,
                            expiresIn: this._authExpiration,
                            algorithm: this._currentRsaAlgType,
                            keyid: this._currentAuthKey,
                            subject: ''
                        };
                        payload = {
                            type: GlobalEnum_1.TokenType.AUTH
                        };
                        privateKey = lib_1.getSecretByKey(this._currentAuthKey);
                        if (privateKey === '') {
                            return [2 /*return*/, Result_1.Result.fail(400, "Private Key is missing for " + this._currentAuthKey)];
                        }
                        return [4 /*yield*/, user.generateToken(privateKey, signInOptions, payload)];
                    case 5:
                        userToken = _a.sent();
                        authData = {
                            access_token: userToken,
                            roles: user.roles.slice(),
                            permissions: Object.keys(permissions),
                            user_data: {
                                _id: user._id,
                                fullName: user.fullName,
                                email: user.email
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
                            email: request.userEmail.toLowerCase(),
                            isEmailConfirmed: true
                        };
                        return [4 /*yield*/, this.findUserByEmail(criteria)];
                    case 1:
                        unverifiedUser = _a.sent();
                        if (!unverifiedUser)
                            return [2 /*return*/, Result_1.Result.fail(404, 'User not found.')];
                        publicKey = lib_1.getPublicKey(this._currentVerifyKey);
                        verifyOptions = {
                            issuer: lib_1.issuer,
                            email: unverifiedUser.email,
                            audience: request.audience,
                            expiresIn: lib_1.verifyTokenExpiration,
                            algorithms: [lib_1.currentRsaAlgType],
                            keyid: this._currentVerifyKey
                        };
                        return [4 /*yield*/, unverifiedUser.verifyToken(request.token, publicKey, verifyOptions)];
                    case 2:
                        decoded = _a.sent();
                        if (!decoded)
                            if (!unverifiedUser)
                                return [2 /*return*/, Result_1.Result.fail(404, 'Token is invalid')];
                        // otherwise, set isEmailConfirmed to true
                        return [4 /*yield*/, this.updateUserIsEmailConfirmed(unverifiedUser)];
                    case 3:
                        // otherwise, set isEmailConfirmed to true
                        _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, true)];
                }
            });
        });
    };
    UserBusiness.prototype.updateUserIsEmailConfirmed = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user.isEmailConfirmed = true;
                        return [4 /*yield*/, this._userRepository.update(user._id, user)];
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
                            return [2 /*return*/, Result_1.Result.fail(400, 'Bad request')];
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
                            return [2 /*return*/, Result_1.Result.fail(400, 'Bad request')];
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
            var user, roleIds, _i, _a, key, role, newUser, tokenOptions, payload, privateKey, verificationToken, welcomeEmailKeyValues, welcomeTemplateString, welcomeEmailPlaceHolder, emailBody, mailParams;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._userRepository.findByCriteria({
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
                            issuer: item.issuer,
                            audience: item.audience,
                            expiresIn: this._authExpiration,
                            algorithm: this._currentRsaAlgType,
                            keyid: this._currentVerifyKey,
                            subject: ''
                        };
                        payload = {
                            type: GlobalEnum_1.TokenType.MAIL,
                            email: newUser.email
                        };
                        privateKey = lib_1.getSecretByKey(this._currentVerifyKey);
                        if (privateKey == '')
                            return [2 /*return*/, Result_1.Result.fail(400, "Private Key is missing for " + this._currentVerifyKey)];
                        return [4 /*yield*/, newUser.generateToken(privateKey, tokenOptions, payload)];
                    case 7:
                        verificationToken = _b.sent();
                        welcomeEmailKeyValues = this.welcomeEmailKeyValue(newUser.fullName, item.audience, verificationToken);
                        welcomeTemplateString = emailtemplates_1.WelcomeEmail.template;
                        welcomeEmailPlaceHolder = {
                            template: welcomeTemplateString,
                            placeholders: welcomeEmailKeyValues
                        };
                        emailBody = TemplatePlaceHolder_1.replaceTemplateString(welcomeEmailPlaceHolder);
                        mailParams = {
                            receivers: [newUser.email],
                            subject: 'Signup Welcome Email',
                            mail: emailBody,
                            senderEmail: 'talents@untappedpool.com',
                            senderName: 'Untapped Pool'
                        };
                        // const dueDate = addSeconds(newUser.createdAt, 10);
                        return [4 /*yield*/, TaskScheduler_1.schedule(StateMachineArns_1.StateMachineArns.EmailStateMachine, newUser.createdAt, mailParams)];
                    case 8:
                        // const dueDate = addSeconds(newUser.createdAt, 10);
                        _b.sent();
                        return [2 /*return*/, Result_1.Result.ok(201, true)];
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
    UserBusiness.prototype.fetchRolePermissionByResourceId = function (roles, resourceId) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, roles_1, role, resourcePermission;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, roles_1 = roles;
                        _a.label = 1;
                    case 1:
                        if (!(_i < roles_1.length)) return [3 /*break*/, 5];
                        role = roles_1[_i];
                        return [4 /*yield*/, this._resourcePermissionRepository.findByCriteria({
                                role: role,
                                resource: resourceId
                            })];
                    case 2:
                        resourcePermission = _a.sent();
                        if (resourcePermission === null)
                            throw new error_1.PlatformError({
                                code: 404,
                                message: "There is no resource permission configured for route with Id " + resourceId
                            });
                        if (resourcePermission.permissions.length < 1)
                            throw new error_1.PlatformError({
                                code: 404,
                                message: "There are no permissions configured for route with Id " + resourceId
                            });
                        return [4 /*yield*/, this.chunckPermission(resourcePermission.permissions)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, this.chunkedUserPermissons];
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserBusiness.prototype.chunckPermission = function (permissions) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, permissions_1, item, permission;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, permissions_1 = permissions;
                        _a.label = 1;
                    case 1:
                        if (!(_i < permissions_1.length)) return [3 /*break*/, 4];
                        item = permissions_1[_i];
                        return [4 /*yield*/, this._permissionRepository.findByCriteria(item)];
                    case 2:
                        permission = _a.sent();
                        if (permission) {
                            if (!this.chunkedUserPermissons[permission.name]) {
                                this.chunkedUserPermissons[permission.name] = permission.name;
                            }
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserBusiness;
}());
Object.seal(UserBusiness);
module.exports = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map
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
var ApprovalRepository_1 = __importDefault(require("../repository/ApprovalRepository"));
var ApprovalOperationRepository_1 = __importDefault(require("../repository/ApprovalOperationRepository"));
var Result_1 = require("../../utils/Result");
var ApprovalBusiness = /** @class */ (function () {
    function ApprovalBusiness() {
        this._approvalRepository = new ApprovalRepository_1.default();
        this._approvalOperationRepository = new ApprovalOperationRepository_1.default();
    }
    ApprovalBusiness.prototype.fetch = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var approvals;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._approvalRepository.fetch(condition)];
                    case 1:
                        approvals = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, approvals)];
                }
            });
        });
    };
    ApprovalBusiness.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var approval;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request.")];
                        return [4 /*yield*/, this._approvalRepository.findById(id)];
                    case 1:
                        approval = _a.sent();
                        if (!approval)
                            return [2 /*return*/, Result_1.Result.fail(404, "Approval of Id " + id + " not found")];
                        else
                            return [2 /*return*/, Result_1.Result.ok(200, approval)];
                        return [2 /*return*/];
                }
            });
        });
    };
    ApprovalBusiness.prototype.findOne = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var approval;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!condition)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request.")];
                        return [4 /*yield*/, this._approvalRepository.findByOne(condition)];
                    case 1:
                        approval = _a.sent();
                        if (!approval)
                            return [2 /*return*/, Result_1.Result.fail(404, "Approval not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, approval)];
                }
            });
        });
    };
    ApprovalBusiness.prototype.findByCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var approval;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._approvalRepository.findByCriteria(criteria)];
                    case 1:
                        approval = _a.sent();
                        if (!approval)
                            return [2 /*return*/, Result_1.Result.fail(404, "Approval not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, approval)];
                }
            });
        });
    };
    ApprovalBusiness.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var newApproval;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        item.approved = false;
                        return [4 /*yield*/, this._approvalRepository.create(item)];
                    case 1:
                        newApproval = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(201, newApproval)];
                }
            });
        });
    };
    ApprovalBusiness.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var approval, updateObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._approvalRepository.findById(id)];
                    case 1:
                        approval = _a.sent();
                        if (!approval)
                            return [2 /*return*/, Result_1.Result.fail(404, "Could not update approval.Approval with Id " + id + " not found")];
                        return [4 /*yield*/, this._approvalRepository.update(approval._id, item)];
                    case 2:
                        updateObj = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, updateObj)];
                }
            });
        });
    };
    // async patch(id: string, item: any): Promise<Result<UserViewModel>> {
    //   try {
    //     const user = await this._approvalRepository.findById(id);
    //     if (!user)
    //       return Result.fail<UserViewModel>(
    //         404,
    //         `Could not update user.User with Id ${id} not found`
    //       );
    //     const updateObj = await this._userRepository.update(user._id, item);
    //     // console.log(updateObj.);
    //     let refinedUser: UserViewModel = {
    //       _id: updateObj._id,
    //       email: updateObj.email,
    //       name: updateObj.username,
    //       profileImagePath: updateObj.profileImagePath,
    //       isEmailConfirmed: updateObj.isEmailConfirmed,
    //       isPhoneConfirmed: updateObj.isPhoneConfirmed,
    //       isProfileCompleted: updateObj.isProfileCompleted,
    //       generalNotification: updateObj.generalNotification,
    //       emailNotification: updateObj.emailNotification,
    //       profileVisibility: updateObj.profileVisibility,
    //       loginCount: updateObj.loginCount,
    //       status: [updateObj.status],
    //       roles: updateObj.roles,
    //       lastLogin: updateObj.lastLogin,
    //       createdAt: updateObj.createdAt
    //     };
    //     return Result.ok<UserViewModel>(200, refinedUser);
    //   } catch (err) {
    //     throw new Error(`InternalServer error occured.${err.message}`);
    //   }
    // }
    ApprovalBusiness.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isDeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._approvalRepository.delete(id)];
                    case 1:
                        isDeleted = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, isDeleted)];
                }
            });
        });
    };
    return ApprovalBusiness;
}());
Object.seal(ApprovalBusiness);
module.exports = ApprovalBusiness;
//# sourceMappingURL=ApprovalBusiness.js.map
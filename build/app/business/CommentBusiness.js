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
var CommentRepository_1 = __importDefault(require("../repository/CommentRepository"));
var UserRepository_1 = __importDefault(require("../repository/UserRepository"));
var Result_1 = require("../../utils/Result");
var CommentBusiness = /** @class */ (function () {
    function CommentBusiness() {
        this._commentRepository = new CommentRepository_1.default();
        this._userRepository = new UserRepository_1.default();
    }
    CommentBusiness.prototype.fetch = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var comments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._commentRepository.fetchWithUserDetails(condition)];
                    case 1:
                        comments = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, comments)];
                }
            });
        });
    };
    CommentBusiness.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request.")];
                        return [4 /*yield*/, this._commentRepository.findById(id)];
                    case 1:
                        comment = _a.sent();
                        if (!comment)
                            return [2 /*return*/, Result_1.Result.fail(404, "Comment of Id " + id + " not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, comment)];
                }
            });
        });
    };
    CommentBusiness.prototype.findOne = function (condition) {
        return __awaiter(this, void 0, void 0, function () {
            var comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!condition)
                            return [2 /*return*/, Result_1.Result.fail(400, "Bad request.")];
                        return [4 /*yield*/, this._commentRepository.findByOne(condition)];
                    case 1:
                        comment = _a.sent();
                        if (!comment)
                            return [2 /*return*/, Result_1.Result.fail(404, "Comment not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, comment)];
                }
            });
        });
    };
    CommentBusiness.prototype.findByCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._commentRepository.findByCriteria(criteria)];
                    case 1:
                        comment = _a.sent();
                        if (!comment)
                            return [2 /*return*/, Result_1.Result.fail(404, "Comment not found")];
                        return [2 /*return*/, Result_1.Result.ok(200, comment)];
                }
            });
        });
    };
    CommentBusiness.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var newComment, userDetails, likedBy, commentObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._commentRepository.create(item)];
                    case 1:
                        newComment = _a.sent();
                        return [4 /*yield*/, this._userRepository.findById(newComment.user)];
                    case 2:
                        userDetails = _a.sent();
                        likedBy = [];
                        commentObj = {
                            _id: newComment._id,
                            media: newComment.media,
                            comment: newComment.comment,
                            user: {
                                _id: userDetails._id,
                                fullName: userDetails.fullName,
                                profileImagePath: userDetails.profileImagePath || "",
                            },
                            replies: newComment.replies,
                            likedBy: likedBy.slice(),
                            createdAt: newComment.createdAt,
                            updatedAt: newComment.updateAt,
                        };
                        return [2 /*return*/, Result_1.Result.ok(201, commentObj)];
                }
            });
        });
    };
    CommentBusiness.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var comment, updateObj, commenterDetails, likedBy, userReplies, _i, userReplies_1, reply, userId, replyCommenter, commentObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._commentRepository.findById(id)];
                    case 1:
                        comment = _a.sent();
                        if (!comment)
                            return [2 /*return*/, Result_1.Result.fail(404, "Could not update comment.Comment with Id " + id + " not found")];
                        return [4 /*yield*/, this._commentRepository.update(comment._id, item)];
                    case 2:
                        updateObj = _a.sent();
                        return [4 /*yield*/, this._userRepository.findById(updateObj.user)];
                    case 3:
                        commenterDetails = _a.sent();
                        likedBy = updateObj.likedBy.reduce(function (theMap, theItem) {
                            var newLikeObj = {
                                _id: theItem._id,
                                user: theItem.user,
                            };
                            theMap = theMap.concat([newLikeObj]);
                            return theMap;
                        }, []);
                        userReplies = updateObj.replies.reduce(function (theMap, theItem) {
                            var newReplyObj = {
                                _id: theItem._id,
                                user: {
                                    _id: theItem.user,
                                    fullName: "",
                                    profileImagePath: "",
                                },
                                reply: theItem.reply,
                            };
                            theMap = theMap.concat([newReplyObj]);
                            return theMap;
                        }, []);
                        if (!(userReplies.length > 0)) return [3 /*break*/, 7];
                        _i = 0, userReplies_1 = userReplies;
                        _a.label = 4;
                    case 4:
                        if (!(_i < userReplies_1.length)) return [3 /*break*/, 7];
                        reply = userReplies_1[_i];
                        userId = reply.user ? reply.user._id : "";
                        return [4 /*yield*/, this._userRepository.findById(userId)];
                    case 5:
                        replyCommenter = _a.sent();
                        reply.user = {
                            _id: replyCommenter._id,
                            fullName: replyCommenter.fullName,
                            profileImagePath: replyCommenter.profileImagePath || "",
                        };
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        commentObj = {
                            _id: updateObj._id,
                            media: updateObj.media,
                            comment: updateObj.comment,
                            user: {
                                _id: commenterDetails._id,
                                fullName: commenterDetails.fullName,
                                profileImagePath: commenterDetails.profileImagePath || "",
                            },
                            replies: userReplies.slice(),
                            likedBy: updateObj.likedBy.slice(),
                            createdAt: updateObj.createdAt,
                            updatedAt: updateObj.updateAt,
                        };
                        return [2 /*return*/, Result_1.Result.ok(200, commentObj)];
                }
            });
        });
    };
    CommentBusiness.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isDeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._commentRepository.delete(id)];
                    case 1:
                        isDeleted = _a.sent();
                        return [2 /*return*/, Result_1.Result.ok(200, isDeleted)];
                }
            });
        });
    };
    return CommentBusiness;
}());
Object.seal(CommentBusiness);
module.exports = CommentBusiness;
//# sourceMappingURL=CommentBusiness.js.map
"use strict";
var CommentModel = /** @class */ (function () {
    function CommentModel(commentModel) {
        this._commentModel = commentModel;
    }
    Object.defineProperty(CommentModel.prototype, "entity", {
        get: function () {
            return this._commentModel.entity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommentModel.prototype, "comment", {
        get: function () {
            return this._commentModel.comment;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommentModel.prototype, "user", {
        get: function () {
            return this._commentModel.user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommentModel.prototype, "replies", {
        get: function () {
            return this._commentModel.replies;
        },
        enumerable: true,
        configurable: true
    });
    return CommentModel;
}());
Object.seal(CommentModel);
module.exports = CommentModel;
//# sourceMappingURL=Comment.js.map
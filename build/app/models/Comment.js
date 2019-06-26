"use strict";
class CommentModel {
    constructor(commentModel) {
        this._commentModel = commentModel;
    }
    get entity() {
        return this._commentModel.entity;
    }
    get comment() {
        return this._commentModel.comment;
    }
    get user() {
        return this._commentModel.user;
    }
    get replies() {
        return this._commentModel.replies;
    }
}
Object.seal(CommentModel);
module.exports = CommentModel;

import { IComment, IUser, IReply } from './interfaces';

class CommentModel {
  private _commentModel: IComment;
  constructor(commentModel: IComment) {
    this._commentModel = commentModel;
  }

  get entity(): string {
    return this._commentModel.entity;
  }
  get comment(): string {
    return this._commentModel.comment;
  }
  get user(): IUser {
    return this._commentModel.user;
  }
  get replies(): IReply[] {
    return this._commentModel.replies;
  }
}

Object.seal(CommentModel);
export = CommentModel;

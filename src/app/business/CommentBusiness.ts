import CommentRepository from "../repository/CommentRepository";
import UserRepository from "../repository/UserRepository";
import ICommentBusiness = require("./interfaces/CommentBusiness");
import { IComment, IReply, ILike } from "../models/interfaces";
import { Result } from "../../utils/Result";
import {
  CommentViewModel,
  ReplyViewModel,
  CommenterViewModel,
  LikeViewModel,
} from "../models/interfaces/custom/Comment";

class CommentBusiness implements ICommentBusiness {
  private _commentRepository: CommentRepository;
  private _userRepository: UserRepository;

  constructor() {
    this._commentRepository = new CommentRepository();
    this._userRepository = new UserRepository();
  }

  async fetch(condition: any): Promise<Result<IComment[]>> {
    const comments = await this._commentRepository.fetchWithUserDetails(
      condition
    );
    return Result.ok<IComment[]>(200, comments);
  }

  async findById(id: string): Promise<Result<IComment>> {
    if (!id) return Result.fail<IComment>(400, "Bad request.");
    const comment = await this._commentRepository.findById(id);
    if (!comment)
      return Result.fail<IComment>(404, `Comment of Id ${id} not found`);
    return Result.ok<IComment>(200, comment);
  }

  async findOne(condition: any): Promise<Result<IComment>> {
    if (!condition) return Result.fail<IComment>(400, "Bad request.");
    const comment = await this._commentRepository.findByOne(condition);
    if (!comment) return Result.fail<IComment>(404, `Comment not found`);
    return Result.ok<IComment>(200, comment);
  }

  async findByCriteria(criteria: any): Promise<Result<IComment>> {
    const comment = await this._commentRepository.findByCriteria(criteria);
    if (!comment) return Result.fail<IComment>(404, `Comment not found`);
    return Result.ok<IComment>(200, comment);
  }

  async create(item: IComment): Promise<Result<any>> {
    const newComment = await this._commentRepository.create(item);
    const userDetails = await this._userRepository.findById(newComment.user);

    const likedBy: LikeViewModel[] = [];

    const commentObj: CommentViewModel = {
      _id: newComment._id,
      media: newComment.media,
      comment: newComment.comment,
      user: {
        _id: userDetails._id,
        fullName: userDetails.fullName,
        profileImagePath: userDetails.profileImagePath || "",
      },
      replies: newComment.replies,
      likedBy: [...likedBy],
      createdAt: newComment.createdAt,
      updatedAt: newComment.updateAt,
    };
    return Result.ok<any>(201, commentObj);
  }

  async update(id: string, item: IComment): Promise<Result<any>> {
    const comment = await this._commentRepository.findById(id);
    if (!comment)
      return Result.fail<IComment>(
        404,
        `Could not update comment.Comment with Id ${id} not found`
      );
    const updateObj = await this._commentRepository.update(comment._id, item);
    const commenterDetails = await this._userRepository.findById(
      updateObj.user
    );

    let likedBy = updateObj.likedBy.reduce(
      (theMap: LikeViewModel[], theItem: ILike) => {
        const newLikeObj: LikeViewModel = {
          _id: theItem._id,
          user: theItem.user,
        };
        theMap = [...theMap, newLikeObj];
        return theMap;
      },
      []
    );

    let userReplies = updateObj.replies.reduce(
      (theMap: ReplyViewModel[], theItem: IReply) => {
        const newReplyObj: ReplyViewModel = {
          _id: theItem._id,
          user: {
            _id: theItem.user,
            fullName: "",
            profileImagePath: "",
          },
          reply: theItem.reply,
        };
        theMap = [...theMap, newReplyObj];
        return theMap;
      },
      []
    );

    if (userReplies.length > 0) {
      for (let reply of userReplies) {
        const userId = reply.user ? reply.user._id : "";
        const replyCommenter = await this._userRepository.findById(userId);
        reply.user = {
          _id: replyCommenter._id,
          fullName: replyCommenter.fullName,
          profileImagePath: replyCommenter.profileImagePath || "",
        };
      }
    }

    const commentObj: CommentViewModel = {
      _id: updateObj._id,
      media: updateObj.media,
      comment: updateObj.comment,
      user: {
        _id: commenterDetails._id,
        fullName: commenterDetails.fullName,
        profileImagePath: commenterDetails.profileImagePath || "",
      },
      replies: [...userReplies],
      likedBy: [...updateObj.likedBy],
      createdAt: updateObj.createdAt,
      updatedAt: updateObj.updateAt,
    };

    return Result.ok<any>(200, commentObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._commentRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(CommentBusiness);
export = CommentBusiness;

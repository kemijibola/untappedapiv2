import CommentRepository from "../repository/CommentRepository";
import ICommentBusiness = require("./interfaces/CommentBusiness");
import { IComment } from "../models/interfaces";
import { Result } from "../../utils/Result";

class CommentBusiness implements ICommentBusiness {
  private _commentRepository: CommentRepository;

  constructor() {
    this._commentRepository = new CommentRepository();
  }

  async fetch(condition: any): Promise<Result<IComment[]>> {
    const comments = await this._commentRepository.fetch(condition);
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

  async create(item: IComment): Promise<Result<IComment>> {
    const newComment = await this._commentRepository.create(item);
    return Result.ok<IComment>(201, newComment);
  }

  async update(id: string, item: IComment): Promise<Result<IComment>> {
    const comment = await this._commentRepository.findById(id);
    if (!comment)
      return Result.fail<IComment>(
        404,
        `Could not update comment.Comment with Id ${id} not found`
      );
    const updateObj = await this._commentRepository.update(comment._id, item);
    return Result.ok<IComment>(200, updateObj);
  }

  async delete(id: string): Promise<Result<boolean>> {
    const isDeleted = await this._commentRepository.delete(id);
    return Result.ok<boolean>(200, isDeleted);
  }
}

Object.seal(CommentBusiness);
export = CommentBusiness;

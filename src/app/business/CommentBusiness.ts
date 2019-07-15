import CommentRepository from '../repository/CommentRepository';
import ICommentBusiness = require('./interfaces/CommentBusiness');
import { IComment } from '../models/interfaces';
import { Result } from '../../utils/Result';

class CommentBusiness implements ICommentBusiness {
  private _commentRepository: CommentRepository;

  constructor() {
    this._commentRepository = new CommentRepository();
  }

  async fetch(condition: any): Promise<Result<IComment[]>> {
    try {
      const comments = await this._commentRepository.fetch(condition);
      return Result.ok<IComment[]>(200, comments);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IComment>> {
    try {
      const comment = await this._commentRepository.findById(id);
      if (!comment)
        return Result.fail<IComment>(404, `Comment of Id ${id} not found`);
      else return Result.ok<IComment>(200, comment);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IComment>> {
    try {
      const comment = await this._commentRepository.findByCriteria(criteria);
      if (!comment) return Result.fail<IComment>(404, `Comment not found`);
      else return Result.ok<IComment>(200, comment);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: IComment): Promise<Result<IComment>> {
    try {
      const newComment = await this._commentRepository.create(item);
      return Result.ok<IComment>(201, newComment);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(id: string, item: IComment): Promise<Result<IComment>> {
    try {
      const comment = await this._commentRepository.findById(id);
      if (!comment)
        return Result.fail<IComment>(
          404,
          `Could not update comment.Comment of Id ${id} not found`
        );
      const updateObj = await this._commentRepository.update(comment._id, item);
      return Result.ok<IComment>(200, updateObj);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._commentRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(CommentBusiness);
export = CommentBusiness;

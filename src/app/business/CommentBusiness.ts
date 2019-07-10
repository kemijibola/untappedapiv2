import CommentRepository from '../repository/CommentRepository';
import ICommentBusiness = require('./interfaces/CommentBusiness');
import { IComment } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';

class CommentBusiness implements ICommentBusiness {
  private _commentRepository: CommentRepository;

  constructor() {
    this._commentRepository = new CommentRepository();
  }

  fetch(): Promise<IComment> {
    return this._commentRepository.fetch();
  }

  findById(id: string): Promise<IComment> {
    return this._commentRepository.findById(id);
  }

  findByCriteria(criteria: any): Promise<IComment> {
    return this.findByCriteria(criteria);
  }

  create(item: IComment): Promise<IComment> {
    return this._commentRepository.create(item);
  }

  async update(id: string, item: IComment): Promise<IComment> {
    const commentModel = await this._commentRepository.findById(id);
    if (!commentModel)
      throw new RecordNotFound(`Comment with id: ${id} not found`, 404);
    return this._commentRepository.update(commentModel._id, item);
  }

  delete(id: string): Promise<boolean> {
    return this._commentRepository.delete(id);
  }
}

Object.seal(CommentBusiness);
export = CommentBusiness;

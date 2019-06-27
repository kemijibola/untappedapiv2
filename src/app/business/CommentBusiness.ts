import CommentRepository from '../repository/CommentRepository';
import ICommentBusiness from './interface/CommentBusiness';
import { IComment } from '../models/interfaces';

class CategoryBusiness implements ICommentBusiness {
  private _commentRepository: CommentRepository;

  constructor() {
    this._commentRepository = new CommentRepository();
  }

  create(item: IComment, callback: (error: any, result: any) => void) {
    this._commentRepository.create(item, callback);
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._commentRepository.fetch(callback);
  }

  update(
    _id: string,
    item: IComment,
    callback: (error: any, result: any) => void
  ) {
    this._commentRepository.findById(_id, (err, res) => {
      if (err) callback(err, res);
      else this._commentRepository.update(res._id, item, callback);
    });
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._commentRepository.delete(_id, callback);
  }

  findById(_id: string, callback: (error: any, result: IComment) => void) {
    this._commentRepository.findById(_id, callback);
  }
}
Object.seal(CategoryBusiness);
export = CategoryBusiness;

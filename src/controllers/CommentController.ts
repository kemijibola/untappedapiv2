import { controller, post, requestValidators } from '../decorators';
import IBaseController from './interfaces/base/BaseController';
import { Request, Response, NextFunction } from 'express';
import { IComment } from '../app/models/interfaces';
import CommentRepository = require('../app/repository/CommentRepository');

@controller('/comments')
class CommentController {
  @post('/')
  @requestValidators('entityId')
  async create(req: Request, res: Response, next: NextFunction) {
    const item: IComment = req.body;
    try {
      // TODO:: For any entity that uses comment. create comment with only entityId
      // TODO:: Perform update when there is an actual comment to be posted on the entity
      // TODO:: using entityId has lookup
    } catch (err) {
      //new InternalServerError('Internal Server error occured', 500);
    }
  }
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}

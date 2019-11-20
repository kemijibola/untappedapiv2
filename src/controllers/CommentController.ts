import { controller, post, requestValidators } from '../decorators';
import { Request, Response, NextFunction } from 'express';
import { IComment } from '../app/models/interfaces';
import CommentBusiness = require('../app/business/CommentBusiness');
import { PlatformError } from '../utils/error';
import { RequestWithUser } from '../app/models/interfaces/custom/RequestHandler';

@controller('/v1/comments')
export class CommentController {
  @post('/')
  @requestValidators('entityId, comment')
  async create(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      // TODO:: get current user id
      const item: IComment = req.body;
      item.user = req.user;
      const commentBusiness = new CommentBusiness();
      const result = await commentBusiness.create(item);
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error
          })
        );
      }
      return res.status(201).json({
        message: 'Operation successful',
        data: result.data
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: 'Internal Server error occured. Please try again later.'
        })
      );
    }
  }
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}

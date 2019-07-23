import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators, get } from '../decorators';
import { RequestWithUser } from '../app/models/interfaces/custom/RequestHandler';
import { IUserModel } from '../app/models/interfaces';
import { PlatformError } from '../utils/error';
import UserBusiness = require('../app/business/UserBusiness');

@controller('/v1/users')
export class UserController {
  @get('/')
  async fetch(req: Request, res: Response, next: NextFunction) {
    try {
      let condition: { [x: string]: string } = {};
      if (req.query) {
        condition.email = req.query.email || '';
      }
      const userBusiness = new UserBusiness();
      const result = await userBusiness.fetch(condition);
      if (result.error) {
        return next(
          PlatformError.error({
            code: result.responseCode,
            message: `Error occured. ${result.error}`
          })
        );
      }
      return res.status(result.responseCode).json({
        message: 'Operation successful',
        data: result.data
      });
    } catch (err) {
      return next(
        PlatformError.error({
          code: 500,
          message: `Internal Server error occured.${err}`
        })
      );
    }
  }
}

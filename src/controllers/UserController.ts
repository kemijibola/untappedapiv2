import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators, get, patch } from '../decorators';
import { RequestWithUser } from '../app/models/interfaces/custom/RequestHandler';
import { IUserModel } from '../app/models/interfaces';
import { PlatformError } from '../utils/error';
import UserBusiness = require('../app/business/UserBusiness');
import { ObjectKeyString } from '../utils/lib';

@controller('/v1/users')
export class UserController {
  @get('/')
  async fetch(req: Request, res: Response, next: NextFunction) {
    try {
      let condition: ObjectKeyString = {};
      if (req.query) {
        condition.email = req.query.email || '';
      }
      const userBusiness = new UserBusiness();
      const result = await userBusiness.fetch(condition);
      if (result.error) {
        return next(
          new PlatformError({
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
        new PlatformError({
          code: 500,
          message: `Internal Server error occured.${err}`
        })
      );
    }
  }

  @patch('/:id')
  async patch(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const userBusiness = new UserBusiness();
      // const user = req.user;
      const user = '5d39c97b432a2e5fd0484375';
      const result = await userBusiness.patch(user, req.body);
      if (result.error) {
        return next(
          new PlatformError({
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
        new PlatformError({
          code: 500,
          message: `Internal Server error occured.${err}`
        })
      );
    }
  }
}

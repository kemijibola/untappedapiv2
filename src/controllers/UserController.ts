import { Response, NextFunction } from 'express';
import { controller, post, requestValidators } from '../decorators';
import IBaseController from './interfaces/base/BaseController';
import UserRepository = require('../app/repository/UserRepository');
import { RequestWithUser } from '../app/models/interfaces/custom/RequestHandler';
import { IUserModel } from '../app/models/interfaces';

@controller('/users')
class UsersController {
  @post('/')
  @requestValidators('phoneNumbers', 'location', 'categories')
  async create(req: RequestWithUser, res: Response, next: NextFunction) {
    const userId: string = req.user;
    //const user: IUserModel = Helper.
  }
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}

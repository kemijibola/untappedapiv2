import { Request, Response, NextFunction } from 'express';
import { BaseController } from './BaseController';
import {
  AuthResponse,
  ApiResponse
} from '../app/models/interfaces/custom/ApiResponse';
import { get, post, controller, requestValidators } from '../decorators';
import { RequestType } from '../app/models/interfaces/custom/RequestType';
import { ILoginUser } from '../app/models/interfaces/custom/Account';
import { RecordNotFound } from '../utils/error';

@controller('/auth')
class Authentication extends BaseController<AuthResponse> {
  @post('/login')
  @requestValidators(RequestType.BODY, 'email', 'password', 'audience')
  async postLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password, audience }: ILoginUser = req.body;
    // const userModel: IUser = await User.findOne({ email: email.toLowerCase() });
    // if (!userModel.) {
    //   next(new RecordNotFound('Invalid user', 404));
    // }
    // userModel
  }
}

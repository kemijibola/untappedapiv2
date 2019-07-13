import { Request, Response, NextFunction } from 'express';
import { controller, get, post, requestValidators, use } from '../decorators';
import UserBusiness from '../app/business/UserBusiness';
import { PlatformError } from '../utils/error';
import { ILogin } from '../app/models/interfaces';

function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request was made');
  next();
}

@controller('/account')
class AuthController {
  @post('/login')
  @requestValidators('email', 'password', 'audience')
  async postLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const loginParams: ILogin = {
        email: req.body.email,
        password: req.body.password,
        audience: req.body.audience,
        destinationUrl: req.url.toLowerCase()
      };

      const userBusiness = new UserBusiness();
      const result = await userBusiness.login(loginParams);
      if (result.error)
        return next(
          PlatformError.error({
            code: result.responseCode,
            message: result.error
          })
        );
      return res.status(200).json({
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
  create(req: Request, res: Response, next: NextFunction) {}
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}

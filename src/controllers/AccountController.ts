import { Request, Response, NextFunction } from 'express';
import { controller, get, post, requestValidators, use } from '../decorators';
import UserBusiness from '../app/business/UserBusiness';
import { PlatformError } from '../utils/error';
import { ILogin, IRegister } from '../app/models/interfaces';

function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request was made');
  next();
}

@controller('/v1/account')
export class AuthController {
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

  @post('/signup')
  @requestValidators('email', 'password', 'audience', 'name', 'roles')
  async postSignup(req: Request, res: Response, next: NextFunction) {
    try {
      const signUpParams: IRegister = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles,
        audience: req.body.audience
      };
      const userBusiness = new UserBusiness();
      const result = await userBusiness.register(signUpParams);
      if (result.error)
        return next(
          PlatformError.error({
            code: result.responseCode,
            message: result.error
          })
        );
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
  create(req: Request, res: Response, next: NextFunction) {}
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}

import { Request, Response, NextFunction } from 'express';
import { controller, get, post, requestValidators, use } from '../decorators';
import UserBusiness from '../app/business/UserBusiness';
import { PlatformError } from '../utils/error';
import { ILogin, IRegister } from '../app/models/interfaces';
import { issuer, tokenExchange } from '../utils/lib';
import {
  ConfirmEmailRequest,
  ResetPasswordData
} from '../app/models/interfaces/custom/Account';

// export const kemi = ['email', 'password'];
// function logger(req: Request, res: Response, next: NextFunction) {
//   console.log('Request was made');
//   next();
// }

@controller('/v1')
export class AuthController {
  @post('/authentication')
  @requestValidators('email', 'password', 'audience')
  async postLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const destinationIssuer = `${issuer}${req.originalUrl}`;
      const loginParams: ILogin = {
        email: req.body.email,
        password: req.body.password,
        audience: req.body.audience,
        issuer: destinationIssuer,
        destinationUrl: req.url.toLowerCase()
      };

      const userBusiness = new UserBusiness();
      const result = await userBusiness.login(loginParams);
      if (result.error)
        next(
          new PlatformError({
            code: result.responseCode,
            message: result.error
          })
        );
      return res.status(result.responseCode).json({
        message: 'Operation successful',
        data: result.data
      });
    } catch (err) {
      // console.log(err.message);
      // log err.message to a logger with name of action
      return next(
        new PlatformError({
          code: 500,
          message: 'Internal Server error occured. Please try again later.'
        })
      );
    }
  }

  @post('/account/password/reset')
  @requestValidators('email', 'audience', 'confirmationUrl')
  async postforgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const userBusiness = new UserBusiness();
      const result = await userBusiness.forgotPassword(
        req.body.email.toLowerCase(),
        req.body.audience.toLowerCase(),
        req.body.confirmationUrl.toLowerCase()
      );
      if (result.error)
        return next(
          new PlatformError({
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
        new PlatformError({
          code: 500,
          message: 'Internal Server error occured. Please try again later.'
        })
      );
    }
  }

  @post('/account/password/change')
  @requestValidators('oldPassword', 'newPassword')
  async postChangePassword(req: Request, res: Response, next: NextFunction) {
    try {
      // TODO: get userId from tokenExchange
      const userBusiness = new UserBusiness();
      const data: ResetPasswordData = {
        userId: '5db803b9fd13673bd81547e4',
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword
      };
      const result = await userBusiness.resetPassword(data);
      if (result.error)
        return next(
          new PlatformError({
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
        new PlatformError({
          code: 500,
          message: 'Internal Server error occured. Please try again later.'
        })
      );
    }
  }

  @post('/account/resend-link')
  @requestValidators('email', 'audience', 'confirmationUrl')
  async postResendVerificationLink(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userBusiness = new UserBusiness();

      const result = await userBusiness.resendVerificationLink(
        req.body.email.toLowerCase(),
        req.body.audience.toLowerCase(),
        req.body.confirmationUrl.toLowerCase()
      );
      if (result.error)
        return next(
          new PlatformError({
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
        new PlatformError({
          code: 500,
          message: 'Internal Server error occured. Please try again later.'
        })
      );
    }
  }

  @post('/account/verify')
  @requestValidators('email', 'audience', 'token')
  async postVerifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      // if (!req.query.email)
      //   next(
      //     new PlatformError({
      //       code: 400,
      //       message: 'Request is missing email parameter'
      //     })
      //   );
      // if (!req.query.token)
      //   next(
      //     new PlatformError({
      //       code: 400,
      //       message: 'Request is missing token parameter'
      //     })
      //   );
      const request: ConfirmEmailRequest = {
        userEmail: req.body.email,
        token: req.body.token,
        audience: req.body.audience
      };

      const userBusiness = new UserBusiness();
      const result = await userBusiness.confirmEmail(request);
      if (result.error)
        return next(
          new PlatformError({
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
        new PlatformError({
          code: 500,
          message: 'Internal Server error occured. Please try again later.'
        })
      );
    }
  }

  @post('/account/signup')
  @requestValidators(
    'email',
    'password',
    'audience',
    'fullName',
    'roles',
    'confirmationUrl'
  )
  async postSignup(req: Request, res: Response, next: NextFunction) {
    try {
      // const destinationIssuer = `${issuer}${req.originalUrl}`;
      const signUpParams: IRegister = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles,
        audience: req.body.audience,
        confirmationUrl: req.body.confirmationUrl
      };
      const userBusiness = new UserBusiness();
      const result = await userBusiness.register(signUpParams);
      if (result.error)
        return next(
          new PlatformError({
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
        new PlatformError({
          code: 500,
          message: 'Internal Server error occured. Please try again later.'
        })
      );
    }
  }
}

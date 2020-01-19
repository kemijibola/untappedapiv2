import { Request, Response, NextFunction } from "express";
import { controller, get, post, requestValidators, use } from "../decorators";
import UserBusiness from "../app/business/UserBusiness";
import { PlatformError } from "../utils/error";
import { ILogin, IRegister } from "../app/models/interfaces";
import {
  ConfirmEmailRequest,
  ChangePasswordData,
  VerifyResetPasswordRequest,
  ResetPasswordRequest
} from "../app/models/interfaces/custom/Account";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import { requireAuth } from "../middlewares/auth";

// export const kemi = ['email', 'password'];
// function logger(req: Request, res: Response, next: NextFunction) {
//   console.log('Request was made');
//   next();
// }

@controller("/v1")
export class AuthController {
  @post("/authentication")
  @requestValidators("email", "password", "audience")
  async postLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const loginParams: ILogin = {
        email: req.body.email.toLowerCase(),
        password: req.body.password,
        audience: req.body.audience.toLowerCase(),
        issuer: ""
      };

      const userBusiness = new UserBusiness();
      const result = await userBusiness.login(loginParams);
      if (result.error)
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error
          })
        );
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data
      });
    } catch (err) {
      console.log(err);
      // console.log(err.message);
      // log err.message to a logger with name of action
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later."
        })
      );
    }
  }

  @post("/account/password/reset")
  @requestValidators("email", "newPassword")
  async postResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const userBusiness = new UserBusiness();
      const item: ResetPasswordRequest = {
        email: req.body.email.toLowerCase(),
        newPassword: req.body.newPassword
      };
      const result = await userBusiness.resetPassword(item);
      if (result.error)
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error
          })
        );
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later."
        })
      );
    }
  }

  @post("/account/password/reset/verify")
  @requestValidators("email", "token", "audience")
  async postVerifyResetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userBusiness = new UserBusiness();
      const item: VerifyResetPasswordRequest = {
        email: req.body.email.toLowerCase(),
        token: req.body.token,
        audience: req.body.audience.toLowerCase()
      };
      const result = await userBusiness.verifyPasswordResetLink(item);
      if (result.error)
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error
          })
        );
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later."
        })
      );
    }
  }

  @post("/account/password/reset/request")
  @requestValidators("email", "audience", "redirectUrl")
  async postforgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const userBusiness = new UserBusiness();
      const result = await userBusiness.forgotPassword(
        req.body.email.toLowerCase(),
        req.body.audience.toLowerCase(),
        req.body.redirectUrl.toLowerCase()
      );
      if (result.error)
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error
          })
        );
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later."
        })
      );
    }
  }

  @post("/account/password/change")
  @use(requireAuth)
  @requestValidators("oldPassword", "newPassword")
  async postChangePassword(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      // TODO: get userId from tokenExchange
      const userBusiness = new UserBusiness();
      const data: ChangePasswordData = {
        userId: req.user,
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword
      };
      const result = await userBusiness.changePassword(data);
      if (result.error)
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error
          })
        );
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later."
        })
      );
    }
  }

  @post("/account/resend-link")
  @requestValidators("email", "audience", "confirmationUrl")
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
        message: "Operation successful",
        data: result.data
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later."
        })
      );
    }
  }

  @post("/account/verify")
  @requestValidators("email", "audience", "token")
  async postVerifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const request: ConfirmEmailRequest = {
        userEmail: req.body.email.toLowerCase(),
        token: req.body.token,
        audience: req.body.audience.toLowerCase()
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
        message: "Operation successful",
        data: result.data
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later."
        })
      );
    }
  }

  @post("/account/signup")
  @requestValidators(
    "email",
    "password",
    "audience",
    "fullName",
    "userType",
    "confirmationUrl"
  )
  async postSignup(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("got here");
      // const destinationIssuer = `${issuer}${req.originalUrl}`;
      const signUpParams: IRegister = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType,
        audience: req.body.audience,
        confirmationUrl: req.body.confirmationUrl,
        roles: []
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
        message: "Operation successful",
        data: result.data
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later."
        })
      );
    }
  }
}

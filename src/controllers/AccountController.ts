import { authExpiration } from "./../utils/lib/Constant";
import { Request, Response, NextFunction } from "express";
import { controller, get, post, requestValidators, use } from "../decorators";
import UserBusiness from "../app/business/UserBusiness";
import RefreshTokenBusiness from "../app/business/RefreshTokenBusiness";
import { PlatformError } from "../utils/error";
import {
  ILogin,
  IRegister,
  IRefreshTokenViewModel,
} from "../app/models/interfaces";
import {
  ConfirmEmailRequest,
  ChangePasswordData,
  VerifyResetPasswordRequest,
  ResetPasswordRequest,
} from "../app/models/interfaces/custom/Account";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import { requireAuth } from "../middlewares/auth";
import { requestValidator } from "../middlewares/ValidateRequest";
import uuid = require("uuid");
import { addSeconds, isPast } from "date-fns";

// export const kemi = ['email', 'password'];
// function logger(req: Request, res: Response, next: NextFunction) {
//   console.log('Request was made');
//   next();
// }

@controller("/v1")
export class AuthController {
  @post("/refresh-token")
  @use(requestValidator)
  @requestValidators("refreshToken", "userId")
  async postRefreshToken(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      var refreshTokenBusiness = new RefreshTokenBusiness();
      var refreshToken = await refreshTokenBusiness.findByCriteria({
        token: req.body.refreshToken,
      });
      if (refreshToken.error)
        return next(
          new PlatformError({
            code: refreshToken.responseCode,
            message: refreshToken.error,
          })
        );

      if (refreshToken.data) {
        if (refreshToken.data.isExpired)
          return next(
            new PlatformError({
              code: 401,
              message: "Refresh token is invalid.",
            })
          );
        if (refreshToken.data.ownerId !== req.body.userId)
          return next(
            new PlatformError({
              code: 403,
              message: "You are not authorized to make this request.",
            })
          );

        // check if refresh token has expired
        var rfTGeneratedDate = addSeconds(
          refreshToken.data.createdAt,
          req.appUser ? req.appUser.refreshTokenExpiresIn : 0
        );

        if (isPast(rfTGeneratedDate)) {
          return next(
            new PlatformError({
              code: 401,
              message:
                "Refresh token has expired. Please generate another token.",
            })
          );
        }
        var userBusiness = new UserBusiness();
        const audience = req.appUser ? req.appUser.audience : "";
        const refreshTokenData: IRefreshTokenViewModel = {
          application: req.appUser ? req.appUser.clientId : "",
        };
        var result = await userBusiness.refreshToken(
          req.body.userId,
          audience,
          refreshTokenData
        );
        if (result.error)
          return next(
            new PlatformError({
              code: result.responseCode,
              message: result.error,
            })
          );
        return res.status(result.responseCode).json({
          message: "Operation successful",
          data: result.data,
        });
      }
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @post("/authentication")
  @use(requestValidator)
  @requestValidators("email", "password")
  async postLogin(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const audience = req.appUser ? req.appUser.audience.toLowerCase() : "";
      const loginParams: ILogin = {
        email: req.body.email.toLowerCase(),
        password: req.body.password,
        audience: audience,
        issuer: "",
      };

      const refreshTokenData: IRefreshTokenViewModel = {
        application: req.appUser ? req.appUser._id : "",
      };
      const userBusiness = new UserBusiness();
      const result = await userBusiness.login(loginParams, refreshTokenData);
      if (result.error)
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error,
          })
        );
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data,
      });
    } catch (err) {
      // log err.message to a logger with name of action
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @post("/account/password/reset")
  @use(requestValidator)
  @requestValidators("email", "newPassword")
  async postResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const userBusiness = new UserBusiness();
      const item: ResetPasswordRequest = {
        email: req.body.email.toLowerCase(),
        newPassword: req.body.newPassword,
      };
      const result = await userBusiness.resetPassword(item);
      if (result.error)
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error,
          })
        );
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data,
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @post("/account/password/reset/verify")
  @use(requestValidator)
  @requestValidators("email", "token")
  async postVerifyResetPassword(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userBusiness = new UserBusiness();
      const audience = req.appUser ? req.appUser.audience.toLowerCase() : "";
      const redirectConfirmation = req.appUser
        ? req.appUser.redirectBaseUrl.toLowerCase()
        : "";
      const item: VerifyResetPasswordRequest = {
        email: req.body.email.toLowerCase(),
        token: req.body.token,
        audience,
      };
      const result = await userBusiness.verifyPasswordResetLink(item);
      if (result.error)
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error,
          })
        );
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data,
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @post("/account/password/reset/request")
  @use(requestValidator)
  @requestValidators("email", "redirectUrl")
  async postforgotPassword(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const audience = req.appUser ? req.appUser.audience.toLowerCase() : "";
      const redirectBaseUrl = req.appUser
        ? req.appUser.redirectBaseUrl.toLowerCase()
        : "";
      const userBusiness = new UserBusiness();
      const result = await userBusiness.forgotPassword(
        req.body.email.toLowerCase(),
        audience,
        `${redirectBaseUrl}/${req.body.redirectUrl}`
      );
      if (result.error)
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error,
          })
        );
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data,
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @post("/account/password/change")
  @use(requestValidator)
  @use(requireAuth)
  @requestValidators("oldPassword", "newPassword")
  async postChangePassword(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userBusiness = new UserBusiness();
      const data: ChangePasswordData = {
        userId: req.user,
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword,
      };
      const result = await userBusiness.changePassword(data);
      if (result.error)
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error,
          })
        );
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data,
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @post("/account/email/change")
  @use(requestValidator)
  @use(requireAuth)
  @requestValidators("newEmailAddress", "redirectUrl")
  async postChangeEmail(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userBusiness = new UserBusiness();
      const audience = req.appUser ? req.appUser.audience.toLowerCase() : "";
      const redirectConfirmation = req.appUser
        ? req.appUser.redirectBaseUrl.toLowerCase()
        : "";
      const result = await userBusiness.changeEmail(
        req.user,
        req.body.newEmailAddress.toLowerCase(),
        audience,
        `${redirectConfirmation}/${req.body.redirectUrl}`
      );
      if (result.error)
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error,
          })
        );
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data,
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @post("/account/resend-link")
  @use(requestValidator)
  @requestValidators("email")
  async postResendVerificationLink(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userBusiness = new UserBusiness();
      const audience = req.appUser ? req.appUser.audience.toLowerCase() : "";
      const redirectConfirmation = req.appUser
        ? req.appUser.emailConfirmationRedirectUrl.toLowerCase()
        : "";
      const result = await userBusiness.resendVerificationLink(
        req.body.email.toLowerCase(),
        audience,
        redirectConfirmation
      );
      if (result.error)
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error,
          })
        );
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data,
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @post("/account/verify")
  @use(requestValidator)
  @requestValidators("email", "token")
  async postVerifyEmail(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const audience = req.appUser ? req.appUser.audience.toLowerCase() : "";

      const request: ConfirmEmailRequest = {
        userEmail: req.body.email.toLowerCase(),
        token: req.body.token,
        audience,
      };

      const userBusiness = new UserBusiness();
      const result = await userBusiness.confirmEmail(request);
      if (result.error)
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error,
          })
        );
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data,
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @post("/account/email/change/verify")
  @use(requestValidator)
  @use(requireAuth)
  @requestValidators("email", "token")
  async postVerifyChangedEmail(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const audience = req.appUser ? req.appUser.audience.toLowerCase() : "";

      const request: ConfirmEmailRequest = {
        userEmail: req.body.email.toLowerCase(),
        token: req.body.token,
        audience,
      };

      const userBusiness = new UserBusiness();
      const result = await userBusiness.confirmEmailChange(req.user, request);
      if (result.error)
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error,
          })
        );
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data,
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @post("/account/signup")
  @use(requestValidator)
  @requestValidators("email", "password", "fullName", "userType")
  async postSignup(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const audience = req.appUser ? req.appUser.audience.toLowerCase() : "";
      const redirectConfirmation = req.appUser
        ? req.appUser.emailConfirmationRedirectUrl.toLowerCase()
        : "";

      // const destinationIssuer = `${issuer}${req.originalUrl}`;
      const signUpParams: IRegister = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType,
        audience,
        confirmationUrl: redirectConfirmation,
        roles: [],
      };

      if (signUpParams.password.length < 5)
        return next(
          new PlatformError({
            code: 400,
            message: "Password is too short. Must be greater than 3.",
          })
        );

      const userBusiness = new UserBusiness();
      const result = await userBusiness.register(signUpParams);
      if (result.error)
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error,
          })
        );
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data,
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }
}

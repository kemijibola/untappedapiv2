import { canApproveTalentProfile } from "./../utils/lib/PermissionConstant";
import { Request, Response, NextFunction } from "express";
import {
  controller,
  post,
  requestValidators,
  get,
  patch,
  use,
  authorize,
} from "../decorators";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import { PlatformError } from "../utils/error";
import UserBusiness = require("../app/business/UserBusiness");
import UserAccountBusiness = require("../app/business/UserAccountBusiness");
import { ObjectKeyString } from "../utils/lib";
import { requireAuth } from "../middlewares/auth";
import { requestValidator } from "../middlewares/ValidateRequest";
import { canViewUser, canCreateUser } from "../utils/lib/PermissionConstant";

@controller("/v1/users")
export class UserController {
  @get("/")
  @use(requestValidator)
  async fetch(req: Request, res: Response, next: NextFunction) {
    try {
      let condition: ObjectKeyString = {};
      if (req.query) {
        condition.email = req.query.email || "";
      }
      const userBusiness = new UserBusiness();
      const result = await userBusiness.fetch(condition);
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error,
          })
        );
      }
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

  @get("/user-account")
  @use(requestValidator)
  @use(requireAuth)
  async fetchUserAccount(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      let condition = {
        user: req.user,
      };

      const userAccountBusiness = new UserAccountBusiness();
      const result = await userAccountBusiness.findByCriteria(condition);
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error,
          })
        );
      }
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

  @post("/suspend")
  @use(requestValidator)
  @use(requireAuth)
  async postSuspendAccount(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userBusiness = new UserBusiness();
      const userId: string = req.user;
      const currentUser = await userBusiness.findById(req.user);
      if (currentUser.data) {
        if (userId.localeCompare(currentUser.data._id))
          return next(
            new PlatformError({
              code: 403,
              message: "You are not authorized to make this request",
            })
          );
      }
      const result = await userBusiness.updateUserStatus(req.user);
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error,
          })
        );
      }
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

  @post("/")
  @use(requestValidator)
  @use(requireAuth)
  async postUser(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const userBusiness = new UserBusiness();
      const user = req.user;
      const result = await userBusiness.patch(user, req.body);
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error,
          })
        );
      }
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

  @patch("/")
  @use(requestValidator)
  @use(requireAuth)
  async patch(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const userBusiness = new UserBusiness();
      const user = req.user;
      const result = await userBusiness.patch(user, req.body);
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error,
          })
        );
      }
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

  @patch("/admin/approve")
  @use(requireAuth)
  @use(requestValidator)
  @use(requireAuth)
  @authorize(canApproveTalentProfile)
  @requestValidators("userId")
  async postUpdateUserProfile(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.body.userId)
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide userId",
          })
        );

      const userBusiness = new UserBusiness();
      const user = req.user;
      const audience = req.appUser ? req.appUser.audience.toLowerCase() : "";
      const result = await userBusiness.updateUserProfileStatus(
        req.body.userId,
        audience
      );
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error,
          })
        );
      }
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

  @post("/admin/create")
  @use(requireAuth)
  @use(requestValidator)
  @use(requireAuth)
  @authorize(canCreateUser)
  @requestValidators("email", "password", "fullName", "userType", "roles")
  async postCreateAdmin(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userBusiness = new UserBusiness();
      const user = req.user;
      const result = await userBusiness.registerAdmin(req.body);
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error,
          })
        );
      }
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

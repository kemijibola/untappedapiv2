import { Request, Response, NextFunction } from "express";
import {
  controller,
  post,
  requestValidators,
  get,
  patch,
  use
} from "../decorators";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import { IUserModel, ImageEditRequest } from "../app/models/interfaces";
import { PlatformError } from "../utils/error";
import UserBusiness = require("../app/business/UserBusiness");
import { ObjectKeyString } from "../utils/lib";
import { requireAuth } from "../middlewares/auth";

@controller("/v1/users")
export class UserController {
  @get("/")
  // @use(requireAuth)
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
            message: result.error
          })
        );
      }
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

  @patch("/")
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
            message: result.error
          })
        );
      }
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

import { PlatformError } from "../utils/error/ApplicationError";
import { Request, Response, NextFunction } from "express";
import {
  get,
  controller,
  requestValidators,
  post,
  use,
  authorize,
} from "../decorators";
import { IUserType } from "../app/models/interfaces";
import UserTypeBusiness = require("../app/business/UserTypeBusiness");
import { requestValidator } from "../middlewares/ValidateRequest";
import { canCreateUserType } from "../utils/lib/PermissionConstant";

@controller("/v1/user-types")
export class UserTypeController {
  socket: any;
  constructor() {}

  @use(requestValidator)
  @get("/")
  async fetch(req: Request, res: Response, next: NextFunction) {
    try {
      const userTypeBusiness = new UserTypeBusiness();
      const result = await userTypeBusiness.fetch({
        isActive: true,
        isAdmin: false,
      });
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
      console.log(err);
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again.",
        })
      );
    }
  }

  @post("/")
  @authorize(canCreateUserType)
  @requestValidators("name", "isAdmin", "description")
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item: IUserType = req.body;
      const userTypeBusiness = new UserTypeBusiness();
      const result = await userTypeBusiness.create(item);
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
  update(): void {}
  delete(): void {}
  findById(): void {}
}

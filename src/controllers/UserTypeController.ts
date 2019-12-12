import { PlatformError } from "../utils/error/ApplicationError";
import { Request, Response, NextFunction } from "express";
import { get, controller, requestValidators, post } from "../decorators";
import { IUserType } from "../app/models/interfaces";
import UserTypeBusiness = require("../app/business/UserTypeBusiness");

@controller("/v1/user-types")
export class UserTypeController {
  @get("/")
  async fetch(req: Request, res: Response, next: NextFunction) {
    try {
      const userTypeBusiness = new UserTypeBusiness();
      const result = await userTypeBusiness.fetch({});
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
          message: "Internal Server error occured. Please try again."
        })
      );
    }
  }

  @post("/")
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
  update(): void {}
  delete(): void {}
  findById(): void {}
}

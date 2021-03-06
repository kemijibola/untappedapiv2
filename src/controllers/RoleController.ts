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
import { IRole } from "../app/models/interfaces";
import RoleBusiness = require("../app/business/RoleBusiness");
import { requestValidator } from "../middlewares/ValidateRequest";
import { requireAuth } from "../middlewares/auth";
import { canCreateRole } from "../utils/lib/PermissionConstant";

@controller("/v1/roles")
export class RoleController {
  @get("/")
  @use(requestValidator)
  async fetch(req: Request, res: Response, next: NextFunction) {
    try {
      const roleBusiness = new RoleBusiness();
      const result = await roleBusiness.fetch({});
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
  @authorize(canCreateRole)
  @requestValidators("name", "isDefault")
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item: IRole = req.body;
      const roleBusiness = new RoleBusiness();
      const result = await roleBusiness.create(item);
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

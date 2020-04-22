import { PlatformError } from "../utils/error/ApplicationError";
import { Request, Response, NextFunction } from "express";
import {
  controller,
  post,
  requestValidators,
  get,
  use,
  authorize,
} from "../decorators";
import IBaseControler from "./interfaces/base/BaseController";
import { IRolePermission } from "../app/models/interfaces";
import RolePermissionBusiness = require("../app/business/RolePermissionBusiness");
// import { requireAuth } from '../middlewares/auth';
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import { requestValidator } from "../middlewares/ValidateRequest";
import { canCreateRolePermission } from "../utils/lib/PermissionConstant";
import { requireAuth } from "../middlewares/auth";

export const roles = ["canViewProfessionals", "canViewTalents"];
@controller("/v1/role-permissions")
export class RolePermissionController {
  @post("/")
  @use(requestValidator)
  @use(requireAuth)
  // @authorize(canCreateRolePermission)
  @requestValidators("role", "permission", "userType")
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item: IRolePermission = req.body;
      const rolePermissionBusiness = new RolePermissionBusiness();
      const result = await rolePermissionBusiness.create(item);
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error,
          })
        );
      }
      return res.status(201).json({
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
  @get("/")
  // @use(requireAuth)
  @authorize(...roles)
  @use(requestValidator)
  async fetch(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const rolePermissionBusiness = new RolePermissionBusiness();
      const result = await rolePermissionBusiness.fetch({});
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: `Error occured. ${result.error}`,
          })
        );
      }
      return res.status(200).json({
        message: "Operation successful",
        data: result.data,
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: `Internal Server error occured.${err}`,
        })
      );
    }
  }
  findById(): void {}
}

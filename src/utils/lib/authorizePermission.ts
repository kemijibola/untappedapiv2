import { RequestHandler, Response, NextFunction } from "express";
import { PlatformError } from "../error";
import { RequestWithUser } from "../../app/models/interfaces/custom/RequestHandler";
import UserBusiness from "../../app/business/UserBusiness";
import RolePermissionBusiness from "../../app/business/RolePermissionBusiness";
import { ObjectKeyString } from "./Helper";

export function authorizePermission(permissions: string[]): RequestHandler {
  return async function (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (permissions.length > 0) {
        let permissionMap: ObjectKeyString = {};
        var userBusiness = new UserBusiness();
        var rolePermissionBusiness = new RolePermissionBusiness();

        var user = await userBusiness.findById(req.user);

        var userRole = user.data ? user.data.roles[0] : "";
        var userPermissions = await rolePermissionBusiness.fetchWithPermission({
          role: userRole,
        });

        if (userPermissions.data) {
          for (let item of userPermissions.data) {
            if (item.permission) {
              if (!permissionMap[item.permission.name])
                permissionMap[item.permission.name] = item.permission.name;
            }
          }
        }

        let canProceed = false;
        for (let i = 0; i < permissions.length; i++) {
          if (permissionMap[permissions[i]]) {
            canProceed = true;
          }
        }
        if (!canProceed)
          return next(
            new PlatformError({
              code: 403,
              message: "You are not authorized to make this request.",
            })
          );
      }
    } catch (err) {
      return next(
        new PlatformError({
          code: 403,
          message: "An unexpected error occured. Please try again.",
        })
      );
    }
    return next();
  };
}

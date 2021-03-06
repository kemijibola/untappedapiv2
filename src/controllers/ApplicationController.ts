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
import { IApplication } from "../app/models/interfaces";
import ApplicationBusiness = require("../app/business/ApplicationBusiness");
import { ObjectKeyString } from "../utils/lib";
import { requestValidator } from "../middlewares/ValidateRequest";
import { requireAuth } from "../middlewares/auth";
import {
  canCreatePermission,
  canCreateApplication,
} from "../utils/lib/PermissionConstant";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import { isValid, addDays } from "date-fns";

@controller("/v1/application")
export class ApplicationController {
  @get("/")
  @use(requestValidator)
  async fetch(req: Request, res: Response, next: NextFunction) {
    try {
      let condition: ObjectKeyString = {};
      if (req.query) {
        condition.identity = req.query.audience;
      }
      const applicationBusiness = new ApplicationBusiness();
      const result = await applicationBusiness.fetch(condition);
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: `Error occured. ${result.error}`,
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
          message: `Internal Server error occured.${err}`,
        })
      );
    }
  }

  @post("/")
  @use(requestValidator)
  @use(requireAuth)
  @requestValidators(
    "name",
    "audience",
    "clientId",
    "emailConfirmationRedirectUrl",
    "refreshTokenExpiresIn"
  )
  @authorize(canCreateApplication)
  async create(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const item: IApplication = req.body;
      // refreshTokenExpiresIn is expressed in days 1,2,3,4
      const newDate = addDays(new Date(), item.refreshTokenExpiresIn);

      if (!isValid(newDate))
        return next(
          new PlatformError({
            code: 400,
            message:
              "refreshTokenExpiresIn is invalid, expects a numeric value.",
          })
        );
      if (item.refreshTokenExpiresIn > 7) {
        return next(
          new PlatformError({
            code: 400,
            message:
              "refreshTokenExpiresIn can not be valid for more than 7 days",
          })
        );
      }
      item.clientId = item.clientId.toLowerCase();
      const applicationBusiness = new ApplicationBusiness();
      const result = await applicationBusiness.create(item);
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: `Error occured. ${result.error}`,
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
          message: `Internal Server error occured.${err}`,
        })
      );
    }
  }
}

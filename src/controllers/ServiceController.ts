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
import { IService } from "../app/models/interfaces";
import ServiceBusiness = require("../app/business/ServiceBusiness");
import { requestValidator } from "../middlewares/ValidateRequest";
import {
  canCreateContest,
  canCreateService,
} from "../utils/lib/PermissionConstant";
import { requireAuth } from "../middlewares/auth";

@controller("/v1/services")
export class ServiceController {
  @use(requestValidator)
  @get("/")
  async fetch(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceBusiness = new ServiceBusiness();
      const result = await serviceBusiness.fetch({
        active: true,
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
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again.",
        })
      );
    }
  }

  @post("/")
  @use(requestValidator)
  @requestValidators("name", "price")
  @use(requireAuth)
  @authorize(canCreateService)
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item: IService = req.body;
      const serviceBusiness = new ServiceBusiness();
      const result = await serviceBusiness.create(item);
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

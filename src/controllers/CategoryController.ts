import { Request, Response, NextFunction } from "express";
import {
  controller,
  post,
  requestValidators,
  get,
  use,
  authorize,
} from "../decorators";
import { ICategory } from "../app/models/interfaces";
import CategoryBusiness from "../app/business/CategoryBusiness";
import { PlatformError } from "../utils/error";
import { requestValidator } from "../middlewares/ValidateRequest";
import { requireAuth } from "../middlewares/auth";
import { canCreateCategory } from "../utils/lib/PermissionConstant";

@controller("/v1/categories")
export class CategoryController {
  @get("/")
  @use(requestValidator)
  async fetch(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryBusiness = new CategoryBusiness();
      const result = await categoryBusiness.fetch({});
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
  @use(requireAuth)
  @authorize(canCreateCategory)
  @requestValidators("name")
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item: ICategory = req.body;
      const categoryBusiness = new CategoryBusiness();
      const result = await categoryBusiness.create(item);
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
}

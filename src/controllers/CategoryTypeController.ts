import { Request, Response, NextFunction } from "express";
import {
  controller,
  post,
  requestValidators,
  get,
  use,
  authorize
} from "../decorators";
import { ICategoryType } from "../app/models/interfaces";
import CategoryTypeBusiness from "../app/business/CategoryTypeBusiness";
import { PlatformError } from "../utils/error";
import { requestValidator } from "../middlewares/ValidateRequest";
import { requireAuth } from "../middlewares/auth";
import { canCreateCategoryType } from "../utils/lib/PermissionConstant";

@controller("/v1/categories-types")
export class CategoryTypeController {
  @get("/")
  @use(requestValidator)
  async fetch(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryTypeBusiness = new CategoryTypeBusiness();
      const result = await categoryTypeBusiness.fetchWithCategory({});
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
  @use(requestValidator)
  @use(requireAuth)
  @authorize(canCreateCategoryType)
  @requestValidators("name", "category")
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item: ICategoryType = req.body;
      const categoryTypeBusiness = new CategoryTypeBusiness();
      const result = await categoryTypeBusiness.create(item);
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error
          })
        );
      }
      return res.status(201).json({
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

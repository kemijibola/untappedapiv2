import { PlatformError } from "../utils/error/ApplicationError";
import { Request, Response, NextFunction } from "express";
import { get, controller, requestValidators, post, use } from "../decorators";
import { IRole, IUserFilterCategory } from "../app/models/interfaces";
import UserFilterCategoryBusiness = require("../app/business/UserFilterCategoryBusiness");
import { requestValidator } from "../middlewares/ValidateRequest";
import { ObjectKeyString } from "../utils/lib";

@controller("/v1/user-categories")
export class UserFilterCategoryController {
  @post("/")
  @use(requestValidator)
  async fetch(req: Request, res: Response, next: NextFunction) {
    try {
      let condition: ObjectKeyString = {};

      if (req.body.searchText) {
        condition.searchText = req.body.searchText;
      }

      if (req.body.categoryId) {
        condition.categoryId = req.body.categoryId;
      }

      if (req.body.userTypeId) {
        condition.userTypeId = req.body.userTypeId;
      }

      if (req.body.reportType) {
        condition.reportType = req.body.reportType.toLowerCase();
      }

      const userFilterCategoryBusiness = new UserFilterCategoryBusiness();
      const result = await userFilterCategoryBusiness.fetch(condition);

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

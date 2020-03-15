import { PlatformError } from "../utils/error/ApplicationError";
import { Request, Response, NextFunction } from "express";
import { get, controller, requestValidators, post, use } from "../decorators";
import { IRole, IUserFilterCategory } from "../app/models/interfaces";
import TalentFilterCategoryBusiness = require("../app/business/UserFilterCategoryBusiness");
import { requestValidator } from "../middlewares/ValidateRequest";

@controller("/v1/user-categories")
export class UserFilterCategoryController {
  @get("/")
  @use(requestValidator)
  async fetch(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.query.reportType) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide reportType in query param"
          })
        );
      }
      const talentFilterCategoryBusiness = new TalentFilterCategoryBusiness();
      const result = await talentFilterCategoryBusiness.fetch({
        reportType: req.query.reportType.toLowerCase()
      });
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

  // @post('/')
  // @requestValidators('name', 'global', 'description')
  // async create(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const item: ITalentFilterCategory = req.body;
  //     const talentFilterCategoryBusiness = new TalentFilterCategoryBusiness();
  //     const result = await talentFilterCategoryBusiness.create(item);
  //     if (result.error) {
  //       return next(
  //         PlatformError.error({
  //           code: result.responseCode,
  //           message: `Error occured. ${result.error}`
  //         })
  //       );
  //     }
  //     return res.status(result.responseCode).json({
  //       message: 'Operation successful',
  //       data: result.data
  //     });
  //   } catch (err) {
  //     return next(
  //       PlatformError.error({
  //         code: 500,
  //         message: `Internal Server error occured.${err}`
  //       })
  //     );
  //   }
  // }
  update(): void {}
  delete(): void {}
  findById(): void {}
}

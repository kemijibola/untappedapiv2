import { Request, Response, NextFunction } from "express";
import {
  controller,
  post,
  requestValidators,
  use,
  authorize
} from "../decorators";
import { IContest } from "../app/models/interfaces";
import ContestBusiness = require("../app/business/ContestBusiness");
import { PlatformError } from "../utils/error";
import { requestValidator } from "../middlewares/ValidateRequest";

@controller("/v1/contests")
export class ContestController {
  @post("/")
  @use(requestValidator)
  @requestValidators(
    "title",
    "information",
    "eligibleCategories",
    "eligibilityInfo",
    "submissionRules",
    "startDate",
    "contestType",
    "duration",
    "redeemable"
  )
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item: IContest = req.body;
      const contestBusiness = new ContestBusiness();
      const result = await contestBusiness.create(item);
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

  @authorize("ADMIN")
  async updateContest(req: Request, res: Response, next: NextFunction) {}

  @authorize("ADMIN")
  async pathContest(req: Request, res: Response, next: NextFunction) {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}

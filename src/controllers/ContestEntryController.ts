import { Request, Response, NextFunction } from "express";
import {
  controller,
  post,
  requestValidators,
  use,
  authorize,
  get,
} from "../decorators";
import { IContestEntry } from "../app/models/interfaces";
import { requestValidator } from "../middlewares/ValidateRequest";
import { requireAuth } from "../middlewares/auth";
import {
  canCreateContest,
  canEnterContest,
} from "../utils/lib/PermissionConstant";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import ContestEntryBusiness = require("../app/business/ContestEntryBusiness");
import { PlatformError } from "../utils/error";
import { ObjectKeyString } from "../utils/lib";

@controller("/v1/contest-entries")
export class ContestEntryController {
  @get("/:id/user")
  @use(requestValidator)
  @use(requireAuth)
  async canEnterContest(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const contestEntryBusiness = new ContestEntryBusiness();
      const result = await contestEntryBusiness.checkUserEligibility(
        req.params.id,
        req.user
      );
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error,
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
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @post("/")
  @use(requestValidator)
  @use(requireAuth)
  @authorize(canEnterContest)
  @requestValidators("contest", "title", "entry")
  async create(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const item: IContestEntry = req.body;
      item.user = req.user;

      if (item.title.length < 1)
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide title",
          })
        );
      if (item.entry.length < 1)
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide entry",
          })
        );
      if (item.contest.length < 1)
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide contest",
          })
        );
      const contestEntryBusiness = new ContestEntryBusiness();
      const result = await contestEntryBusiness.create(item);
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

import { Request, Response, NextFunction } from "express";
import {
  controller,
  post,
  requestValidators,
  use,
  authorize,
  get,
  put,
  patch,
} from "../decorators";
import {
  IContestEntry,
  EntryPosition,
  CreateEntryPosition,
} from "../app/models/interfaces";
import { requestValidator } from "../middlewares/ValidateRequest";
import { requireAuth } from "../middlewares/auth";
import {
  canUpdateEntryPosition,
  canEnterContest,
  canViewPendingEntry,
  canApproveEntry,
  canRejectEntry,
} from "../utils/lib/PermissionConstant";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import ContestEntryBusiness = require("../app/business/ContestEntryBusiness");
import { PlatformError } from "../utils/error";
import { ObjectKeyString, isUnique } from "../utils/lib";

@controller("/v1/contest-entries")
export class ContestEntryController {
  @get("/:id/user")
  @use(requestValidator)
  @use(requireAuth)
  async canEnterContest(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
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

  @get("/user")
  @use(requestValidator)
  @use(requireAuth)
  async fetchUserContestList(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const contestEntryBusiness = new ContestEntryBusiness();
      const result = await contestEntryBusiness.fetchContestEntryListByUser(
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
      console.log(err);
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @get("/admin/contest-entry/pending")
  @use(requestValidator)
  @authorize(canViewPendingEntry)
  async fetchPendingMedia(req: Request, res: Response, next: NextFunction) {
    try {
      const contestEntryBusiness = new ContestEntryBusiness();
      const result = await contestEntryBusiness.fetch({
        approved: false,
      });
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: `Error occured, ${result.error}`,
          })
        );
      }
      return res.status(result.responseCode).json({
        message: "Media Operation successful",
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

  @use(requireAuth)
  @use(requestValidator)
  @patch("admin/approve/:id")
  @authorize(canApproveEntry)
  async approveEntry(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const contestEntryBusiness = new ContestEntryBusiness();
      const result = await contestEntryBusiness.approveContestEntry(
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
      return res.status(result.responseCode).json({
        message: "Operation successful",
        data: result.data,
      });
    } catch (err) {
      console.log(err);
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @use(requireAuth)
  @use(requestValidator)
  @patch("admin/reject/:id")
  @authorize(canRejectEntry)
  @requestValidators("reason")
  async rejectEntry(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      if (!req.body.reason)
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide rejection reason",
          })
        );
      const contestEntryBusiness = new ContestEntryBusiness();
      const result = await contestEntryBusiness.rejectContestEntry(
        req.params.id,
        req.user,
        req.body.reason
      );
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
      console.log(err);
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }
}

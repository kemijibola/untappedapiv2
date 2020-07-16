import { Request, Response, NextFunction } from "express";
import {
  controller,
  post,
  requestValidators,
  use,
  authorize,
  get,
} from "../decorators";
import { IContest, MediaType, PaymentStatus } from "../app/models/interfaces";
import ContestBusiness = require("../app/business/ContestBusiness");
import { PlatformError } from "../utils/error";
import { requestValidator } from "../middlewares/ValidateRequest";
import { requireAuth } from "../middlewares/auth";
import { ObjectKeyString } from "../utils/lib";
import { canCreateContest } from "../utils/lib/PermissionConstant";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import { differenceInDays, isAfter } from "date-fns";

@controller("/v1/contests")
export class ContestController {
  @post("/")
  @use(requestValidator)
  @use(requireAuth)
  @requestValidators(
    "title",
    "information",
    "startDate",
    "endDate",
    "entryMediaType",
    "redeemable"
  )
  @authorize(canCreateContest)
  async create(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      /**
       * If eligibleCategories is [], means contest is open to all categories
       *
       */

      const item: IContest = req.body;
      if (isAfter(Date.now(), item.startDate)) {
        return next(
          new PlatformError({
            code: 400,
            message: "Contest start date must be today or a later date",
          })
        );
      }
      if (differenceInDays(item.startDate, item.endDate) > 14) {
        return next(
          new PlatformError({
            code: 400,
            message: "Contest duration must not exceed 14 days from start date",
          })
        );
      }
      const mediaType = item.entryMediaType.toLowerCase();
      const systemMediaTypes: string[] = Object.values(MediaType);
      if (!systemMediaTypes.includes(mediaType)) {
        return next(
          new PlatformError({
            code: 400,
            message: "Contest entry media type is invalid",
          })
        );
      }

      if (item.redeemable.length < 1) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please add at least one winner to contest",
          })
        );
      }

      if (item.redeemable.length > 3) {
        return next(
          new PlatformError({
            code: 400,
            message: "Contest can not have more than 3 winners",
          })
        );
      }

      item.createdBy = req.user;
      const contestBusiness = new ContestBusiness();
      const result = await contestBusiness.create(item);
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
      // console.log(err);
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @get("/preview/list")
  @use(requestValidator)
  async fetchContestPreviewList(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let reqPageNo = req.query.pageNo || 0;
      const pageNo = parseInt(reqPageNo) !== 0 ? parseInt(reqPageNo) : 0;
      let reqSize = req.query.size || 10;
      const size = parseInt(reqSize);

      //change condition to paid contests
      TODO: let condition = {
        // paymentStatus: PaymentStatus.Completed,
      };
      const contestBusiness = new ContestBusiness();
      const result = await contestBusiness.fetchContestList(
        condition,
        size,
        pageNo
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
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @get("/:id")
  @use(requestValidator)
  async fetchContestDetailsById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let condition: ObjectKeyString = {};
      const contestBusiness = new ContestBusiness();
      const result = await contestBusiness.fetchContestDetailsById(
        req.params.id
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
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @get("/user/contests")
  @use(requestValidator)
  async fetchContestListByUser(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId: string = req.user;
      const contestBusiness = new ContestBusiness();
      const result = await contestBusiness.fetchContestListByUser(userId);
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

  @get("/dashboard/runningcontests")
  @use(requestValidator)
  async fetchContestDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const contestBusiness = new ContestBusiness();
      const result = await contestBusiness.fetchDashboardContest();
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

  @get("/")
  @use(requestValidator)
  @use(requireAuth)
  async fetch(req: Request, res: Response, next: NextFunction) {
    try {
      let condition: any;
      if (req.query.title) {
        condition = { title: new RegExp("^" + req.query.title + "$", "i") };
      }
      const contestBusiness = new ContestBusiness();
      const result = await contestBusiness.fetch(condition);
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

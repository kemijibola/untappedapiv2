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
  IContest,
  MediaType,
  PaymentStatus,
  PrizePosition,
} from "../app/models/interfaces";
import ContestBusiness = require("../app/business/ContestBusiness");
import { PlatformError } from "../utils/error";
import { requestValidator } from "../middlewares/ValidateRequest";
import { requireAuth } from "../middlewares/auth";
import { ObjectKeyString } from "../utils/lib";
import {
  canCreateContest,
  canDisbursePrize,
  canViewPendingDisbursement,
  canViewPendingContest,
  canApproveContest,
} from "../utils/lib/PermissionConstant";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import { differenceInDays, isAfter, startOfToday, endOfToday } from "date-fns";
import { AppConfig } from "../app/models/interfaces/custom/AppConfig";
const config: AppConfig = module.require("../config/keys");

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
      if (!item.title)
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide contest title",
          })
        );
      if (!item.information)
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide contest information",
          })
        );
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

      if (item.redeemable.length > 5) {
        return next(
          new PlatformError({
            code: 400,
            message: "Contest can not have more than 5 winners",
          })
        );
      }

      const prizePositions: string[] = Object.values(PrizePosition);

      for (let prize of item.redeemable) {
        if (!prizePositions.includes(prize.name)) {
          return next(
            new PlatformError({
              code: 400,
              message: "Invalid prize position",
            })
          );
        }
      }

      for (let prize of item.redeemable) {
        if (prize.prizeCash < config.MiNIMUM_PRIZE_CASH) {
          return next(
            new PlatformError({
              code: 400,
              message: `Minimum prize cash must be NGN ${config.MiNIMUM_PRIZE_CASH}`,
            })
          );
        }
      }

      item.createdBy = req.user;
      // fetch contest with Title
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
      console.log(err);
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @put("/:id")
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
  async updateContest(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const item: IContest = req.body;
      if (!item.title)
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide contest title",
          })
        );
      if (!item.information)
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide contest information",
          })
        );
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

      if (item.redeemable.length > 5) {
        return next(
          new PlatformError({
            code: 400,
            message: "Contest can not have more than 5 winners",
          })
        );
      }

      const prizePositions: string[] = Object.values(PrizePosition);

      for (let prize of item.redeemable) {
        if (!prizePositions.includes(prize.name)) {
          return next(
            new PlatformError({
              code: 400,
              message: "Invalid prize position",
            })
          );
        }
      }

      for (let prize of item.redeemable) {
        if (prize.prizeCash < config.MiNIMUM_PRIZE_CASH) {
          return next(
            new PlatformError({
              code: 400,
              message: `Minimum prize cash must be NGN ${config.MiNIMUM_PRIZE_CASH}`,
            })
          );
        }
      }

      item.createdBy = req.user;
      // fetch contest with Title
      const contestBusiness = new ContestBusiness();
      const result = await contestBusiness.update(item._id, item);
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
      console.log(err);
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

      let condition = {
        paymentStatus: PaymentStatus.Completed,
        approved: true,
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

  @get("/admin/pending")
  @use(requestValidator)
  @authorize(canViewPendingContest)
  async fetchPendingMedia(req: Request, res: Response, next: NextFunction) {
    try {
      const contestBusiness = new ContestBusiness();
      const result = await contestBusiness.fetch({ approved: false, paymentStatus: PaymentStatus.Completed});
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

  @get("/pending/disbursement")
  @use(requestValidator)
  @use(requireAuth)
  @authorize(canViewPendingDisbursement)
  async fetchContestPendingDisbursement(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      let condition: ObjectKeyString = {};
      const contestBusiness = new ContestBusiness();
      const result = await contestBusiness.fetch({
        endDate: { $gte: startOfToday(), $lte: new Date() },
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
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @put("/:id/like")
  @use(requestValidator)
  @use(requireAuth)
  async likeContest(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const contestBusiness = new ContestBusiness();
      const contest = await contestBusiness.findById(req.params.id);
      if (contest.error) {
        return next(
          new PlatformError({
            code: contest.responseCode,
            message: contest.error,
          })
        );
      }

      if (contest.data) {
        const userHasLiked = contest.data.likedBy.filter(
          (x) => x == req.user
        )[0];
        if (userHasLiked) {
          return next(
            new PlatformError({
              code: 400,
              message: "You have already liked contest.",
            })
          );
        }
        contest.data.likedBy = [...contest.data.likedBy, req.user];
        const result = await contestBusiness.update(
          req.params.id,
          contest.data
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
          data: true,
        });
      }
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

  @put("/:id/unLike")
  @use(requestValidator)
  @use(requireAuth)
  async postContesttUnLike(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const contestBusiness = new ContestBusiness();
      const contest = await contestBusiness.findById(req.params.id);
      if (contest.error) {
        return next(
          new PlatformError({
            code: contest.responseCode,
            message: contest.error,
          })
        );
      }
      if (contest.data) {
        const userId: string = req.user;
        const userHasLiked = contest.data.likedBy.filter(
          (x) => x == req.user
        )[0];
        if (!userHasLiked) {
          return next(
            new PlatformError({
              code: 400,
              message: "Yo have not liked contest",
            })
          );
        }

        contest.data.likedBy = contest.data.likedBy.filter(
          (x) => x != req.user
        );

        const result = await contestBusiness.update(
          req.params.id,
          contest.data
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
          data: true,
        });
      }
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

  @put("/:id/page-count")
  @use(requestValidator)
  async postPageView(req: Request, res: Response, next: NextFunction) {
    try {
      const contestBusiness = new ContestBusiness();
      const contest = await contestBusiness.findById(req.params.id);
      if (contest.error) {
        return next(
          new PlatformError({
            code: contest.responseCode,
            message: contest.error,
          })
        );
      }
      if (contest.data) {
        const result = await contestBusiness.patch(req.params.id, {
          views: contest.data.views++,
        });
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
          data: true,
        });
      }
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
      console.log("got here");
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
      const contestBusiness = new ContestBusiness();
      const result = await contestBusiness.fetch({});
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

  @get("/validate/title")
  @use(requestValidator)
  @use(requireAuth)
  async checkIfContestTtitleIsAvailable(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.query.title) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide contest title",
          })
        );
      }
      const condition = {
        title: new RegExp("^" + req.query.title + "$", "i"),
      };
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
      if (result.data) {
        if (result.data.length) {
          if (result.data[0].createdBy.toString() === req.user) {
            return res.status(200).json({
              message: "Operation successful",
              isAvailable: true,
            });
          } else {
            return res.status(200).json({
              message: "Operation successful",
              isAvailable: false,
            });
          }
        }
        return res.status(200).json({
          message: "Operation successful",
          isAvailable: true,
        });
      }
      return res.status(200).json({
        message: "Operation successful",
        isAvailable: true,
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

  @put("admin/approve/:id")
  @use(requireAuth)
  @use(requestValidator)
  @authorize(canApproveContest)
  async approveContest(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const contestBusiness = new ContestBusiness();
      const result = await contestBusiness.approveContest(
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

  @put("admin/reject/:id")
  @use(requireAuth)
  @use(requestValidator)
  @authorize(canApproveContest)
  @requestValidators("reason")
  async rejectContest(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      if (!req.body.reason)
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide rejection reason",
          })
        );
      const contestBusiness = new ContestBusiness();
      const result = await contestBusiness.rejectContest(
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

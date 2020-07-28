import { Request, Response, NextFunction } from "express";
import {
  controller,
  post,
  requestValidators,
  use,
  authorize,
  get,
  put,
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

  // @put("/assign/position")
  // @use(requestValidator)
  // @use(requireAuth)
  // @authorize(canUpdateEntryPosition)
  // @requestValidators("contestId", "positions")
  // async updateEntryPosition(
  //   req: RequestWithUser,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     if (!req.body.contestId)
  //       return next(
  //         new PlatformError({
  //           code: 400,
  //           message: "Please provide contest",
  //         })
  //       );

  //     if (req.body.positions.length < 1)
  //       return next(
  //         new PlatformError({
  //           code: 400,
  //           message: "Please provide at least one contest position",
  //         })
  //       );

  //     const prizePositions: string[] = Object.values(EntryPosition);
  //     for (let item of req.body.positions) {
  //       if (!prizePositions.includes(item.position)) {
  //         return next(
  //           new PlatformError({
  //             code: 400,
  //             message: "Invalid prize position",
  //           })
  //         );
  //       }
  //     }

  //     const item: CreateEntryPosition = req.body;

  //     const positions = item.positions.map(function (item) {
  //       return item.position;
  //     });
  //     if (!isUnique(positions))
  //       return next(
  //         new PlatformError({
  //           code: 400,
  //           message: "Entry position must be unique",
  //         })
  //       );

  //     const contestEntryBusiness = new ContestEntryBusiness();
  //     const result = await contestEntryBusiness.updateEntryPosition(item);
  //     if (result.error) {
  //       return next(
  //         new PlatformError({
  //           code: result.responseCode,
  //           message: result.error,
  //         })
  //       );
  //     }
  //     return res.status(200).json({
  //       message: "Operation successful",
  //       data: result.data,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     return next(
  //       new PlatformError({
  //         code: 500,
  //         message: "Internal Server error occured. Please try again later.",
  //       })
  //     );
  //   }
  // }
}

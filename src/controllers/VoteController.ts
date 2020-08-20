import { PlatformError } from "../utils/error/ApplicationError";
import { Request, Response, NextFunction } from "express";
import {
  get,
  controller,
  requestValidators,
  post,
  use,
  authorize,
} from "../decorators";
import {
  IUserType,
  VoteTransaction,
  ChannelType,
  VoteStatus,
} from "../app/models/interfaces";
import VoteTransactionBusiness = require("../app/business/VoteTransactionBusiness");
import ApplicationBusiness = require("../app/business/ApplicationBusiness");
import { requestValidator } from "../middlewares/ValidateRequest";
import { canCreateUserType } from "../utils/lib/PermissionConstant";
import ContestBusiness = require("../app/business/ContestBusiness");
import { signatureHash } from "../utils/lib/Helper";
import { AppConfig } from "../app/models/interfaces/custom/AppConfig";
const config: AppConfig = module.require("../config/keys");

@controller("/v1/votes")
export class VoteController {
  @get("/contest/:id/result")
  @use(requestValidator)
  async fetchContestEntries(req: Request, res: Response, next: NextFunction) {
    try {
      const contestId: string = req.params.id;
      const contestBusiness = new ContestBusiness();
      var contest = await contestBusiness.findById(contestId);
      if (contest.error)
        return next(
          new PlatformError({
            code: 404,
            message: contest.error,
          })
        );

      if (contest.data) {
        const voteTransactionBusiness = new VoteTransactionBusiness();
        const result = await voteTransactionBusiness.FetchContestResult(
          contest.data
        );

        return res.status(200).json({
          message: "Operation successful",
          data: result,
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

  @post("/")
  // @requestValidators("id", "phone", "network", "shortcode", "message")
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("apikey from info-tek", req.headers["ApiKey"]);
      if (!req.headers["ApiKey"]) return res.sendStatus(200);
      if (
        !req.body.id ||
        !req.body.phone ||
        !req.body.shortcode ||
        !req.body.host ||
        !req.body.message
      )
        return res.sendStatus(200);
      var contestKeyPart: string[] = req.body.message.split(" ");
      console.log("contestKeyParts", contestKeyPart);
      if (contestKeyPart.length < 1) return res.sendStatus(200);
      const applicationBusiness = new ApplicationBusiness();
      var ceaserResult = await applicationBusiness.findByCriteria({
        audience: `https://${req.body.host}`,
        isActive: true,
      });
      console.log("ceaser engine found", ceaserResult);
      if (ceaserResult.data) {
        const apiKey: any = req.headers["ApiKey"];
        var decoded = Buffer.from(apiKey).toString("base64");
        console.log("decoded", decoded);
        if (decoded !== ceaserResult.data.clientSecret)
          return res.sendStatus(200);
        console.log("vote is about to be processed");
        const item: VoteTransaction = Object.assign({
          channelId: req.body.id,
          phone: req.body.phone,
          network: req.body.network,
          shortcode: req.body.shortcode,
          contestantCode: contestKeyPart[1],
          keyword: contestKeyPart[0] ? contestKeyPart[0].toLowerCase() : "JUNK",
          channelType: ChannelType.sms,
        });

        const voteBusiness = new VoteTransactionBusiness();
        const result = await voteBusiness.createSMSVote(item);

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
      }
      return res.sendStatus(200);
    } catch (err) {
      console.log("");
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }
}

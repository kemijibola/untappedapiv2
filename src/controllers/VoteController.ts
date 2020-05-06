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
import { requestValidator } from "../middlewares/ValidateRequest";
import { canCreateUserType } from "../utils/lib/PermissionConstant";

@controller("/v1/votes")
export class VoteController {
  @post("/")
  @requestValidators("id", "phone", "network", "shortcode", "message")
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.id)
        return next(
          new PlatformError({
            code: 400,
            message: "Missing id in request",
          })
        );
      const item: VoteTransaction = Object.assign({
        channelId: req.body.id,
        phone: req.body.phone,
        network: req.body.network,
        shortcode: req.body.shortcode,
        contestantCode: req.body.message,
        channelType: ChannelType.sms,
        voteStatus: VoteStatus.valid,
      });

      const voteBusiness = new VoteTransactionBusiness();
      const result = await voteBusiness.create(item);
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
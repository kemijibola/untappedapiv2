import { Request, Response, NextFunction } from "express";
import {
  controller,
  post,
  requestValidators,
  get,
  patch,
  use,
  authorize,
} from "../decorators";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import { PlatformError } from "../utils/error";
import WalletBusiness = require("../app/business/WalletDataBusiness");
import {
  canCreateUserType,
  canCreateUser,
  canCreateWallet,
  canViewWallet,
} from "../utils/lib/PermissionConstant";
import { requestValidator } from "../middlewares/ValidateRequest";
import { requireAuth } from "../middlewares/auth";
import { WalletData } from "../app/models/interfaces";
import { PaymentProviderStatus } from "../app/models/interfaces/custom/TransactionDTO";

@controller("/v1/wallets")
export class WalletController {
  @get("/details")
  @use(requestValidator)
  @use(requireAuth)
  @authorize(canViewWallet)
  async fetchWalletBalance(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const walletBusiness = new WalletBusiness();
      let condition = {
        user: req.user,
        status: PaymentProviderStatus.activated,
      };
      const result = await walletBusiness.findByCriteriaFirstOrDefault(
        condition
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

  @post("/")
  @use(requestValidator)
  @use(requireAuth)
  @authorize(canCreateWallet)
  @requestValidators("pin")
  async postCreate(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      let item: WalletData = req.body;

      const walletBusiness = new WalletBusiness();
      item.user = req.user;

      const result = await walletBusiness.create(item);
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

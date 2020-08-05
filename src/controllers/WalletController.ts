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
import TransactionRequestBusiness = require("../app/business/TransactionRequestBusiness");
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
import { encrypt, decrypt } from "../utils/lib";

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

  @post("/transfer")
  @use(requestValidator)
  @requestValidators("processor", "walletPin", "amount")
  @use(requireAuth)
  async transfer(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      if (!req.body.processor) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide processor",
          })
        );
      }

      if (!req.body.walletPin) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide walletPin",
          })
        );
      }

      if (!req.body.amount) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide amount",
          })
        );
      }

      var amount = req.body.amount;
      let amountValue = 0;
      if (!isNaN(Number(amount))) {
        amountValue = Number(amount);
      } else {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide valid amount",
          })
        );
      }

      if (amountValue < 500) {
        return next(
          new PlatformError({
            code: 400,
            message: "Amount to withdraw must be greater than 500",
          })
        );
      }

      var amountInKobo = amountValue * 100;
      const walletBusiness = new WalletBusiness();
      var result = await walletBusiness.transferFromWallet(
        req.body.processor,
        req.body.walletPin,
        amountInKobo,
        req.user,
        req.body.narration
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

  @get("/transactions")
  @use(requestValidator)
  @use(requireAuth)
  async fetchUserTransactions(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const transactionRequestBusiness = new TransactionRequestBusiness();
      const result = await transactionRequestBusiness.fetchTransactions({
        user: req.user,
        transactionStatus: "success",
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
      console.log(err);
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again.",
        })
      );
    }
  }
}

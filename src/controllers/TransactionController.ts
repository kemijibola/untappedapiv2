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
import { IOrder, IUserAccount } from "../app/models/interfaces";
import UserAccountBusiness = require("../app/business/UserAccountBusiness");
import TransactionRequestBusiness = require("../app/business/TransactionRequestBusiness");
import { requestValidator } from "../middlewares/ValidateRequest";
import { requireAuth } from "../middlewares/auth";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import { PaymentFactory } from "../utils/payments/PaymentFactory";
import {
  AbstractPayment,
  PaymentGatewayType,
  PaystackWebhookEvent,
  PaystackTransactionFailedResponse,
} from "../utils/payments/payer";
import { AppConfig } from "../app/models/interfaces/custom/AppConfig";
import { signatureHash } from "../utils/lib/Helper";
import { PaymentProviderStatus } from "../app/models/interfaces/custom/TransactionDTO";
import { canCreateWallet } from "../utils/lib/PermissionConstant";
const config: AppConfig = require("../config/keys");

@controller("/v1/transactions")
export class TransactionController {
  constructor() {}

  @post("/banks")
  @use(requestValidator)
  @requestValidators("processor")
  @use(requireAuth)
  async fetchBanks(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      if (!req.body.processor) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide processor",
          })
        );
      }

      try {
        var paymentFactory: AbstractPayment = new PaymentFactory().create(
          req.body.processor.toLowerCase()
        );

        const result = await paymentFactory.fetchBanks();
        if (result.status) {
          return res.status(200).json({
            message: result.message,
            data: result.data,
          });
        }
      } catch (err) {
        return next(
          new PlatformError({
            code: 400,
            message: err.error.message,
          })
        );
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

  @post("/bank/resolve")
  @use(requestValidator)
  @requestValidators("processor", "accountNumber", "bankCode")
  @use(requireAuth)
  async resolveAccountNumber(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.body.processor) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide processor",
          })
        );
      }

      if (!req.body.accountNumber) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide accountNumber",
          })
        );
      }

      if (!req.body.bankCode) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide bankCode",
          })
        );
      }
      var paymentFactory: AbstractPayment = new PaymentFactory().create(
        req.body.processor.toLowerCase()
      );

      try {
        const result = await paymentFactory.verifyAccountNmber(
          req.body.accountNumber,
          req.body.bankCode
        );
        if (result.status) {
          const userAccountBusiness = new UserAccountBusiness();
          const userAccountObj: IUserAccount = Object.assign({
            user: req.user,
            accountNumber: result.data.account_number,
            accountName: result.data.account_name,
            bankId: result.data.bank_id,
          });

          if (req.body.processor === PaymentGatewayType.paystack) {
            const transferRecipient = await paymentFactory.createTransferRecipient(
              "nuban",
              userAccountObj.accountName,
              userAccountObj.accountNumber,
              req.body.bankCode
            );
            if (transferRecipient.status) {
              const userAccountObj = Object.assign({
                user: req.user,
                accountNumber: result.data.account_number,
                bankName: transferRecipient.data.details.bank_name,
                accountName: result.data.account_name,
                bankId: result.data.bank_id,
                gatewayRecipientCode: transferRecipient.data.recipient_code,
                currency: transferRecipient.data.currency,
                bankCode: transferRecipient.data.details.bank_code,
              });

              if (
                !transferRecipient.data.active ||
                transferRecipient.data.is_deleted
              ) {
                return next(
                  new PlatformError({
                    code: 400,
                    message:
                      "Your account is inactive. Please reach out to your bank",
                  })
                );
              }

              const userAccount = await userAccountBusiness.create(
                userAccountObj
              );
              return res.status(200).json({
                message: "User account created successfully",
                data: userAccount.data,
              });
            } else {
              return next(
                new PlatformError({
                  code: 400,
                  message: transferRecipient.message,
                })
              );
            }
          }
        }
        return next(
          new PlatformError({
            code: 400,
            message: result.message,
          })
        );
      } catch (err) {
        return next(
          new PlatformError({
            code: 400,
            message: err.error.message,
          })
        );
      }
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  @post("/webhook/transfer/update")
  async updateTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const hash = signatureHash(
        config.PAYMENT_SECRETS.paystack_secret,
        JSON.stringify(req.body)
      );
      if (hash === req.headers["x-paystack-signature"]) {
        // Retrieve the request's body
        var response: PaystackTransactionFailedResponse = req.body;
        const transactionRequestBusiness = new TransactionRequestBusiness();
        var result = await transactionRequestBusiness.updateTransactionStatus(
          response.data.transfer_code,
          response.data.recipient.recipient_code,
          response.data.amount,
          response.data.status,
          response.data.status === "transfer.success"
            ? "Transaction Successful"
            : response.data.status,
          response.data.status === "transfer.success" ? 200 : 400,
          JSON.stringify(response.data),
          response.data.status === "transfer.success"
            ? response.data.transferred_at
            : ""
        );
        return res.sendStatus(200);
      }
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later.",
        })
      );
    }
  }

  async sendTransactionFailed(
    transferCode: string,
    recipientCode: string,
    amount: number,
    status: string,
    responseMessge: string,
    responseCode: number,
    responseBody: string
  ): Promise<void> {
    try {
      const transactionRequestBusiness = new TransactionRequestBusiness();
      var result = await transactionRequestBusiness.updateTransactionStatus(
        transferCode,
        recipientCode,
        amount,
        status,
        responseMessge,
        responseCode,
        responseBody
      );
    } catch (err) {
      console.log(err);
    }
  }

  async sendTransactionSuccess(
    transferCode: string,
    recipientCode: string,
    amount: number,
    status: string,
    responseMessge: string,
    responseCode: number,
    responseBody: string,
    transferredAt: string
  ): Promise<void> {
    try {
      console.log("line 291");
      const transactionRequestBusiness = new TransactionRequestBusiness();
      var result = await transactionRequestBusiness.updateTransactionStatus(
        transferCode,
        recipientCode,
        amount,
        status,
        responseMessge,
        responseCode,
        responseBody
      );
    } catch (err) {
      console.log(err);
    }
  }
}

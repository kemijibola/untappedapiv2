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
import { IOrder } from "../app/models/interfaces";
import OrderBusiness = require("../app/business/OrderBusiness");
import { requestValidator } from "../middlewares/ValidateRequest";
import { requireAuth } from "../middlewares/auth";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import { PaymentFactory } from "../utils/payments/PaymentFactory";
import { AbstractPayment } from "../utils/payments/payer";
import { Paystack } from "../utils/payments/paymentTypes/paystack";

@controller("/v1/orders")
export class OrderController {
  constructor() {}

  @post("/")
  @use(requestValidator)
  @requestValidators("service", "processor", "order")
  @use(requireAuth)
  async create(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const item: IOrder = req.body;
      item.order.user = req.user;
      const orderBusiness = new OrderBusiness();
      const result = await orderBusiness.create(item);
      if (result.error) {
        orderBusiness;
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

  @post("/:id/verify")
  @use(requestValidator)
  @requestValidators("processor", "reference")
  @use(requireAuth)
  async verifyOrder(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      if (!req.body.processor) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide processor",
          })
        );
      }

      if (!req.body.reference) {
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide reference",
          })
        );
      }

      var paymentFactory: AbstractPayment = new PaymentFactory().create(
        req.body.processor.toLowerCase()
      );

      const verifiedPayment = await paymentFactory.verifyPayment(
        req.body.reference
      );

      console.log(verifiedPayment);

      const orderBusiness = new OrderBusiness();
      const result = await orderBusiness.updatePayment(
        verifiedPayment,
        req.params.id
      );

      if (result.error) {
        orderBusiness;
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

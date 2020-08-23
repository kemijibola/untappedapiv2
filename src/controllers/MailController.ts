import { PlatformError } from "../utils/error/ApplicationError";
import { Request, Response, NextFunction } from "express";
import { get, controller, requestValidators, post, use } from "../decorators";
import { MailBusiness } from "../app/business/MailBusiness";
import { requestValidator } from "../middlewares/ValidateRequest";
import { AppConfig } from "../app/models/interfaces/custom/AppConfig";
const config: AppConfig = module.require("../config/keys");

@controller("/v1/mail")
export class MailController {
  constructor() {}

  @post("/send")
  @use(requestValidator)
  @requestValidators("senderEmail", "senderName", "subject", "mailBody")
  async sendMail(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.senderEmail)
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide senderEmail",
          })
        );
      if (!req.body.mailBody)
        return next(
          new PlatformError({
            code: 400,
            message: "Please provide mailBody",
          })
        );
      const recievers: string[] = [config.UNTAPPED_SUPPORT_EMAIL];
      const mailer = MailBusiness.init();
      await mailer.sendMail(
        req.body.senderEmail,
        req.body.senderName || req.body.senderEmail,
        recievers,
        req.body.subject || "",
        req.body.mailBody
      );
      return res.status(200).json({
        message: "Mail sent successfully",
        data: true,
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

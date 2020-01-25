import { Request, Response, NextFunction } from "express";
import { controller, post, requestValidators, use } from "../decorators";
import ApprovalRepository = require("../app/repository/ApprovalRepository");
import { IApproval } from "../app/models/interfaces";
import ApprovalBusiness from "../app/business/ApprovalBusiness";
import BaseController from "./interfaces/base/BaseController";
import { PlatformError } from "../utils/error";
import { requestValidator } from "../middlewares/ValidateRequest";

@controller("/v1/approvals")
export class ApprovalController {
  @post("/")
  @use(requestValidator)
  @requestValidators("entity", "operation", "approved")
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item: IApproval = req.body;
      const approvalBusiness = new ApprovalBusiness();
      const result = await approvalBusiness.create(item);
      if (result.error) {
        return new PlatformError({
          code: result.responseCode,
          message: result.error
        });
      }
      return res.status(200).json({
        message: "Operation Successful",
        data: result.data
      });
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later."
        })
      );
    }
  }
  update(req: Request, res: Response, next: NextFunction): void {}
  delete(req: Request, res: Response, next: NextFunction): void {}
  fetch(req: Request, res: Response, next: NextFunction): void {}
  findById(req: Request, res: Response, next: NextFunction) {}
}

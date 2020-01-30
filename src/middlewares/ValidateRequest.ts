import { Request, Response, NextFunction } from "express";
import { PlatformError } from "../utils/error";
import ApplicationBusiness from "../app/business/ApplicationBusiness";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";

export async function requestValidator(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  let clientId: any = req.headers["clientid"];
  if (!clientId)
    return next(
      new PlatformError({
        code: 400,
        message: "Request is missing clientId"
      })
    );
  try {
    clientId = clientId.toLowerCase();
    console.log(clientId);

    const applicationBusiness = new ApplicationBusiness();
    const result = await applicationBusiness.findByCriteria({
      clientId: clientId
    });
    if (result.data) {
      if (!result.data.isActive) {
        return next(
          new PlatformError({
            code: 400,
            message: "Client not activated."
          })
        );
      }
      req.appUser = result.data;
      return next();
    }
    return next(
      new PlatformError({
        code: result.responseCode,
        message: `Invalid request, ${result.error}`
      })
    );
  } catch (err) {
    return next(
      new PlatformError({
        code: 500,
        message: "Internal Server error occured, Please try again later."
      })
    );
  }
}

import { RequestHandler, Request, Response, NextFunction } from "express";
import { PlatformError } from "../error";

export function requestValidators(keys: string[]): RequestHandler {
  return function(req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      return next(new PlatformError({ code: 400, message: "Invalid request" }));
    }
    let missingProps = "";
    for (let i = 0; i < keys.length; i++) {
      if (!req.body[keys[i]]) {
        missingProps += `${keys[i]} `;
      }
    }
    if (missingProps) {
      return next(
        new PlatformError({
          code: 400,
          message: `Invalid request.Missing property '${missingProps}'`
        })
      );
    }
    next();
  };
}

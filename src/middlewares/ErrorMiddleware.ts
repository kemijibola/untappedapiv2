import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../app/models/interfaces/custom/ApiResponse";
import { IError } from "../utils/error/GlobalError";

export function errorHandler(
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.code || 500;
  const message = err.message || "Something went wrong";
  res.status(status).send({
    response_code: status,
    response_message: message,
  });
}

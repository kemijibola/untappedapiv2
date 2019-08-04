import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../app/models/interfaces/custom/ApiResponse';
import { IError } from '../utils/error/GlobalError';

export function errorHandler(
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.code;
  const message = err.message;
  res.json({
    status: status,
    message,
    data: null
  });
  // return res.status(status).json({
  //   status,
  //   message,
  //   data: null
  // });
}

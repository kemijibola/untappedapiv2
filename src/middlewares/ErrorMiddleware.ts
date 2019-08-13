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
  return res.json({
    status: status,
    error: message,
    data: null
  });
}

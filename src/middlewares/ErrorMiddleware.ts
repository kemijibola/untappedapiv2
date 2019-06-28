import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../app/models/interfaces/custom/ApiResponse';

export function errorHandler(
  err: ApiResponse<null>,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status;
  const message = err.message;
  res.status(status).send({
    status,
    message,
    data: null
  });
}

import { Request, Response, NextFunction } from 'express';

export function sample(req: Request, res: Response, next: NextFunction) {
  console.log('Request was made');
  next();
}

import { RequestHandler, Request, Response, NextFunction } from 'express';

export function requestValidators(keys: string[]): RequestHandler {
  return function(req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.send({ error: 'Change to error handler' });
      return;
    }
    for (let key of keys) {
      if (!req.body[key]) {
        res.send({ error: 'Change to error handler' });
        return;
      }
    }
    next();
  };
}

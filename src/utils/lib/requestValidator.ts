import { RequestType } from '../../interfaces/Request';
import { RequestHandler, Request, Response, NextFunction } from 'express';

export function requestValidators(
  requesType: string,
  keys: string[]
): RequestHandler {
  return function(req: Request, res: Response, next: NextFunction) {
    switch (requesType) {
      case RequestType.BODY:
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
        break;
      case RequestType.PARAMS:
        if (!req.params) {
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
        break;
      default:
        break;
    }
  };
}

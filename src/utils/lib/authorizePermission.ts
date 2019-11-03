import { RequestHandler, Response, NextFunction } from 'express';
import { PlatformError } from '../error';
import { RequestWithUser } from '../../app/models/interfaces/custom/RequestHandler';

export function authorizePermission(policies: string[]): RequestHandler {
  return function(req: RequestWithUser, res: Response, next: NextFunction) {
    if (policies.length > 0) {
      const userPermissions: string[] = [...req.user.permissions];
      let found = false;
      for (let i = 0; i < userPermissions.length; i++) {
        if (policies.includes(userPermissions[i])) {
          found = true;
        }
      }
      if (!found) {
        return next(
          new PlatformError({
            code: 403,
            message: ' You are not authorized.'
          })
        );
      }
    }
    next();
  };
}
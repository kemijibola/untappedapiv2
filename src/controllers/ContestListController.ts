import { Request, Response, NextFunction } from 'express';
import { controller, get } from '../decorators';
import { IContest } from '../app/models/interfaces';
import ContestBusiness = require('../app/business/ContestBusiness');
import { PlatformError } from '../utils/error';
import { IContestList } from '../app/models/interfaces/custom/ContestList';
import { Result } from '../utils/Result';
import { RequestWithUser } from '../app/models/interfaces/custom/RequestHandler';

// http://untappedpool.com/v1/contest-list
// http://untappedpool.com/v1/contest-list?user='userId'

@controller('/v1/contest-list')
export class ContestListController {
  // @get('/')
  // async fetchContestList(
  //   req: RequestWithUser,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     const contestBusiness = new ContestBusiness();
  //     if (req.query) {
  //       const condition = {
  //         createdBy: req.query.user
  //       };
  //       const result = await contestBusiness.fetchContestList(condition);
  //     }
  //     if (result.error) {
  //       return next(
  //         PlatformError.error({
  //           code: result.responseCode,
  //           message: `Error occured. ${result.error}`
  //         })
  //       );
  //     }
  //     return res.status(result.responseCode).json({
  //       message: 'Operation successful',
  //       data: result.data
  //     });
  //   } catch (err) {
  //     return next(
  //       PlatformError.error({
  //         code: 500,
  //         message: `Internal Server error occured.${err}`
  //       })
  //     );
  //   }
  // }
}

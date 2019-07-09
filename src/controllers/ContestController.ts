import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators } from '../decorators';
import IBaseController from './interfaces/base/BaseController';
import { InternalServerError, InvalidContent } from '../utils/error';
import { IContest } from '../app/models/interfaces';
import { ContestType } from '../app/data/schema/Contest';
import { addDays, isAfter } from 'date-fns';
import ContestRepository = require('../app/repository/ContestRepository');

@controller('/contests')
class ContestController implements IBaseController {
  @post('/')
  @requestValidators(
    'title',
    'information',
    'eligibleCategories',
    'eligibilityInfo',
    'submissionRules',
    'startDate',
    'contestType',
    'duration',
    'redeemable'
  )
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item: IContest = req.body;

      const endDate: Date = addDays(item.startDate, item.duration);
      if (item.contestType === ContestType.Offline) {
        if (item.maxContestant === undefined || item.maxContestant < 1)
          return next(
            new InvalidContent(
              'Invalid number of contestant to be selected',
              400
            )
          );
        // do a check to ensure grandfinal date is greater than end date
        // TODO: get date parts
        const isGrandFinaleDateAfter: boolean = isAfter(
          new Date(1989, 6, 10),
          endDate
        );
        if (!isGrandFinaleDateAfter) {
          return next(
            new InvalidContent(
              'Grand finale date must be after end of contest',
              400
            )
          );
        }
        if (!item.grandFinaleDate)
          return next(
            new InvalidContent(
              'Please provide Grand finale event location.',
              400
            )
          );
        if (!item.evaluations)
          return next(
            new InvalidContent(
              'Please provide Grand finale event location.',
              400
            )
          );
      }
      const contest = await new ContestRepository().create(item);
      return res.status(201).json({
        message: 'Operation successful',
        data: contest
      });
    } catch (err) {
      // TODO:: When this happens, create a schedule email to remind user of transaction
      new InternalServerError('Internal Server error occured', 500);
    }
  }
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}

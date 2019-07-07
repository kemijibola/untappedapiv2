import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators } from '../decorators';
import IBaseControler from './interfaces/base/BaseController';
import { InternalServerError } from '../utils/error';
import { IContestEntry } from '../app/models/interfaces';
import ContestEntryEpository = require('../app/repository/ContestEntryEpository');
import {
  SqsScheduler,
  SqsSendMessage,
  SqsParams
} from '../utils/schedule/SqsScheduler';

@controller('/contest-entries')
class ContestEntryController implements IBaseControler {
  @post('/')
  @requestValidators('contest', 'submissionPath')
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item: IContestEntry = req.body;
      const contestEntry = await new ContestEntryEpository().create(item);

      // create a job to create entry with contest Entry Id in Comment collection
      // we will use contest entry id to do a lookup on the comment later in the collection
      const data: { entityId: string } = {
        entityId: contestEntry._id
      };
      const sqsParams: SqsParams = {
        region: '',
        version: '',
        accountId: ''
      };
      const sendMessageParams: SqsSendMessage = {
        MessageBody: JSON.stringify(data),
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com'
      };

      const scheduler = SqsScheduler.setup(sqsParams);
      scheduler.create<SqsSendMessage>('comment-entity', sendMessageParams);

      return res.status(201).json({
        message: 'Operation successful',
        data: contestEntry
      });
    } catch (err) {
      return next(
        new InternalServerError('Internal Server error occured', 500)
      );
    }
  }
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}

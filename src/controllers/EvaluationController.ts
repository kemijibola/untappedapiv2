import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators } from '../decorators';
import IBaseController from './interfaces/base/BaseController';
import { IEvaluation } from '../app/models/interfaces';

@controller('/evaluation')
class EvaluationController {
  @post('/')
  @requestValidators('name')
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item: IEvaluation = req.body;
    } catch (err) {
      //new InternalServerError('Internal Server error occured', 500);
    }
  }
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}

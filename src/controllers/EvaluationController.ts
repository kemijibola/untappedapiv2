import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators } from '../decorators';
import IBaseControler from './interfaces/base/BaseController';
import { InternalServerError, InvalidContent } from '../utils/error';
import { IEvaluation } from '../app/models/interfaces';

@controller('/evaluation')
class EvaluationController implements IBaseControler {
  @post('/')
  @requestValidators('name')
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item: IEvaluation = req.body;
    } catch (err) {
      new InternalServerError('Internal Server error occured', 500);
    }
  }
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}

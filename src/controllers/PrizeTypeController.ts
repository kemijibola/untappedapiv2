import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators } from '../decorators';
import IBaseControler from './interfaces/base/BaseController';
import PrizeTypeRepository = require('../app/repository/PrizeTypeRepository');
import { IPrizeType } from '../app/models/interfaces';
import { RecordExists, InternalServerError } from '../utils/error';

@controller('./prize-types')
class PrizeTypeController implements IBaseControler {
  @post('/')
  @requestValidators('name')
  async create(req: Request, res: Response, next: NextFunction) {
    const item: IPrizeType = req.body;
    try {
      let prizeTypeModel = await new PrizeTypeRepository().findByCriteria({
        name: item.name.toLowerCase()
      });
      if (prizeTypeModel)
        return next(
          new RecordExists(
            `Prize type with name ${prizeTypeModel.name} exists.`,
            400
          )
        );
      const prizeType = await new PrizeTypeRepository().create(item);
      return res.status(201).json({
        message: 'Operation successful',
        data: prizeType
      });
    } catch (err) {
      next(new InternalServerError('Internal Server error occured', 500));
    }
  }
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}

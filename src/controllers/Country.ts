import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators } from '../decorators';
import IBaseController from './interfaces/base/BaseController';
import CountryRepository = require('../app/repository/CountryRepository');
import { ICountry } from '../app/models/interfaces';
import { RecordExists, InternalServerError } from '../utils/error';

@controller('/countries')
class CountryController implements IBaseController {
  @post('/')
  @requestValidators('name')
  async create(req: Request, res: Response, next: NextFunction) {
    const item: ICountry = req.body;
    try {
      let countryModel = await new CountryRepository().findByCriteria({
        name: item.name.toLowerCase()
      });
      if (countryModel)
        return next(
          new RecordExists(
            `Country with name ${countryModel.name} exists.`,
            400
          )
        );
      const country = await new CountryRepository().create(item);
      return res.status(201).json({
        message: 'Operation successful',
        data: country
      });
    } catch (err) {
      new InternalServerError('Internal Server error occured', 500);
    }
  }
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}

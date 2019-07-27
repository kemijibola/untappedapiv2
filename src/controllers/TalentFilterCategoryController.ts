import { PlatformError } from '../utils/error/ApplicationError';
import { Request, Response, NextFunction } from 'express';
import { get, controller, requestValidators, post } from '../decorators';
import { IRole, ITalentFilterCategory } from '../app/models/interfaces';
import TalentFilterCategoryBusiness = require('../app/business/TalentFilterCategoryBusiness');

@controller('/v1/talent_category')
export class TalentFilterCategoryController {
  @get('/')
  async fetch(req: Request, res: Response, next: NextFunction) {
    try {
      const talentFilterCategoryBusiness = new TalentFilterCategoryBusiness();
      const result = await talentFilterCategoryBusiness.fetch({});
      if (result.error) {
        return next(
          PlatformError.error({
            code: result.responseCode,
            message: `Error occured. ${result.error}`
          })
        );
      }
      return res.status(result.responseCode).json({
        message: 'Operation successful',
        data: result.data
      });
    } catch (err) {
      return next(
        PlatformError.error({
          code: 500,
          message: `Internal Server error occured.${err}`
        })
      );
    }
  }

  // @post('/')
  // @requestValidators('name', 'global', 'description')
  // async create(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const item: ITalentFilterCategory = req.body;
  //     const talentFilterCategoryBusiness = new TalentFilterCategoryBusiness();
  //     const result = await talentFilterCategoryBusiness.create(item);
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
  update(): void {}
  delete(): void {}
  findById(): void {}
}

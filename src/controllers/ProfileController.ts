import { Request, Response, NextFunction } from 'express';
import { controller, post, patch, requestValidators } from '../decorators';
import IBaseController from './interfaces/base/BaseController';
import TalentRepository = require('../app/repository/TalentRepository');
import ProfessionalRepository = require('../app/repository/ProfessionalRepository');
import UserRepository = require('../app/repository/UserRepository');
import CategoryRepository = require('../app/repository/CategoryRepository');
import { ITalent, IProfessional, IUserModel } from '../app/models/interfaces';
import { RequestWithUser } from '../app/models/interfaces/custom/RequestHandler';
import { IProfile } from '../app/models/interfaces/custom/Profile';
import { UserTypes } from '../app/models/interfaces/custom/GlobalEnum';

@controller('/v1/profile')
class ProfileController {
  @post('/')
  @requestValidators('phoneNumbers', 'location', 'categories')
  async create(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      // const userId: string = req.user;
      // const userModel: IUserModel = await new UserRepository().userTypeByUser(
      //   userId
      // );
      // if (!userModel.userType.name)
      //   return next(
      //     new RecordNotFound(`User with id ${userId} not found`, 404)
      //   );
      // // validate categories sent by user
      // const profile: IProfile = req.body;
      // for (let item of profile.categories) {
      //   const categoryModel = await new CategoryRepository().findById(item._id);
      //   if (!categoryModel)
      //     return next(
      //       new RecordNotFound(`Invalid category of id ${item}`, 404)
      //     );
      // }
      // switch (userModel.userType.name) {
      //   case UserTypes.TALENT:
      //     const talentModel = await new TalentRepository().break;
      //   case UserTypes.PROFESSIONAL:
      //     break;
      //   default:
      //     break;
      // }
    } catch (err) {
      //next(new InternalServerError('Internal Server error occured', 500));
    }
  }

  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}

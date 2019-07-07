import { Request, Response, NextFunction } from 'express';
import { controller, post, requestValidators } from '../decorators';
import IBaseControler from './interfaces/base/BaseController';
import PermissionRepository = require('../app/repository/PermissionRepository');
import { IPermission } from '../app/models/interfaces';
import { RecordExists, InternalServerError } from '../utils/error';

@controller('/permissions')
class PermissionController implements IBaseControler {
  @post('/')
  @requestValidators('name')
  async create(req: Request, res: Response, next: NextFunction) {
    const item: IPermission = req.body;
    try {
      let permissionModel = await new PermissionRepository().findByCriteria({
        name: item.name.toLowerCase()
      });
      if (permissionModel)
        return next(
          new RecordExists(
            `Permission with name ${permissionModel.name} exists.`,
            400
          )
        );
      const permission = await new PermissionRepository().create(item);
      return res.status(201).json({
        message: 'Operation successful',
        data: permission
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

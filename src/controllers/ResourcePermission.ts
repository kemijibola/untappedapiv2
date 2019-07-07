import { Request, Response, NextFunction } from 'express';
import { controller, post } from '../decorators';
import IBaseControler from './interfaces/base/BaseController';
import { IResourcePermission } from '../app/models/interfaces';

@controller('/resource-permissions')
class ResourcePermission implements IBaseControler {
  @post('/')
  create(req: Request, res: Response, next: NextFunction): void {}
  update(): void {}
  delete(): void {}
  fetch(): void {}
  findById(): void {}
}

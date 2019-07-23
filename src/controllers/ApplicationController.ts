import { PlatformError } from '../utils/error/ApplicationError';
import { Request, Response, NextFunction } from 'express';
import { get, controller, requestValidators, post } from '../decorators';
import { IApplication } from '../app/models/interfaces';
import ApplicationBusiness = require('../app/business/ApplicationBusiness');

@controller('/applications')
export class ApplicationController {
  @get('/')
  async fetch(req: Request, res: Response, next: NextFunction) {
    try {
      let condition: { [x: string]: string } = {};
      if (req.query) {
        condition.identity = req.query.audience;
      }
      const applicationBusiness = new ApplicationBusiness();
      const result = await applicationBusiness.fetch(condition);
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

  @post('/')
  @requestValidators('name', 'dbUri', 'country', 'identity')
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item: IApplication = req.body;
      const applicationBusiness = new ApplicationBusiness();
      const result = await applicationBusiness.create(item);
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
  update(): void {}
  delete(): void {}
  findById(): void {}
}

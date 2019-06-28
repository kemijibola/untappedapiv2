import express = require('express');
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { AppRouter } from '../../AppRouter';
import { ApiResponse } from '../../app/models/interfaces/custom/ApiResponse';
import { errorHandler } from '../ErrorMiddleware';

class MiddlewaresBase {
  static get configuration() {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(AppRouter.getInstance);
    app.use(function(
      error: ApiResponse<null>,
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      errorHandler(error, req, res, next);
    });

    return app;
  }
}

Object.seal(MiddlewaresBase);
export = MiddlewaresBase;

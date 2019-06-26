import express = require('express');
import bodyParser from 'body-parser';
import { AppRouter } from '../../AppRouter';

class MiddlewaresBase {
  
  static get configuration() {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(AppRouter.getInstance);

    return app;
  }
}

Object.seal(MiddlewaresBase);
export = MiddlewaresBase;

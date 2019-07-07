import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { AppRouter } from './AppRouter';
import './controllers/AccountController';
import { AppConfig } from './app/models/interfaces/custom/AppConfig';
const config: AppConfig = module.require('./config/keys');
import { ApiResponse } from './app/models/interfaces/custom/ApiResponse';
import { errorHandler } from './middlewares/ErrorMiddleware';
import { IError } from './utils/error/GlobalError';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(AppRouter.getInstance);

app.use(function(
  error: IError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  errorHandler(error, req, res, next);
});

const port = config.PORT || 5000;
app.set('port', port);

app.listen(port, () => {
  console.log(`Untapped Pool app successfully started on ${port}`);
});

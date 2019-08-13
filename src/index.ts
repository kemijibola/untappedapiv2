import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { AppRouter } from './AppRouter';
import './controllers';
import { AppConfig } from './app/models/interfaces/custom/AppConfig';
const config: AppConfig = module.require('./config/keys');
module.require('./utils/Cache');
import { errorHandler } from './middlewares/ErrorMiddleware';
import { IError } from './utils/error/GlobalError';
import cors from 'cors';
// import SocketIo = require('./socket/SocketIo');
import { SocketIo } from './socket/SocketIo';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(function(req: Request, res: Response, next: NextFunction) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

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
  SocketIo.setUpApp(app);
});

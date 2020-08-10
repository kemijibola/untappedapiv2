import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { AppRouter } from "./AppRouter";
import "./controllers";

import { AppConfig } from "./app/models/interfaces/custom/AppConfig";
const config: AppConfig = module.require("./config/keys");
// module.require("./utils/Cache");
// module.require("./utils/filtercategory/UserFilter");
import * as cron from "node-cron";
import { errorHandler } from "./middlewares/ErrorMiddleware";
import { IError } from "./utils/error/GlobalError";
import cors from "cors";
// import SocketIo = require('./socket/SocketIo');
import { userFilterJob, contestSettlement } from "./utils/CronJob";
import { PlatformError } from "./utils/error";
/// <reference path="typings/tsd.d.ts" />
import * as cluster from "cluster";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(AppRouter.getInstance);

app.use(function (
  error: IError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  errorHandler(error, req, res, next);
});

process.on("unhandledRejection", function (err) {
  // sendInTheCalvary(err);
  throw new PlatformError({
    code: 500,
    message: "An unexpected error occured, Please try again",
  });
});

const port = config.PORT || 5000;
app.set("port", port);

if (cluster.isMaster) {
  // only master should run cron job
  userFilterJob();

  contestSettlement();
}

app.listen(port, () => {
  console.log(`Untapped Pool app successfully started on ${port}`);
});

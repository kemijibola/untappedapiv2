"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var AppRouter_1 = require("./AppRouter");
require("./controllers");
var config = module.require("./config/keys");
var ErrorMiddleware_1 = require("./middlewares/ErrorMiddleware");
var cors_1 = __importDefault(require("cors"));
// import SocketIo = require('./socket/SocketIo');
var CronJob_1 = require("./utils/CronJob");
var error_1 = require("./utils/error");
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
app.use(AppRouter_1.AppRouter.getInstance);
app.use(function (error, req, res, next) {
    ErrorMiddleware_1.errorHandler(error, req, res, next);
});
process.on("unhandledRejection", function (err) {
    // sendInTheCalvary(err);
    throw new error_1.PlatformError({
        code: 500,
        message: "An unexpected error occured, Please try again",
    });
});
var port = config.PORT || 5000;
app.set("port", port);
var instance = config.NODE_APP_INSTANCE || 0;
if (instance === 0) {
    CronJob_1.userFilterJob();
    CronJob_1.contestSettlement();
}
app.listen(port, function () {
    console.log("Untapped Pool app successfully started on " + port);
});
//# sourceMappingURL=index.js.map
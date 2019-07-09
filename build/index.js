"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var AppRouter_1 = require("./AppRouter");
require("./controllers/AccountController");
var config = module.require('./config/keys');
var ErrorMiddleware_1 = require("./middlewares/ErrorMiddleware");
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(AppRouter_1.AppRouter.getInstance);
app.use(function (error, req, res, next) {
    ErrorMiddleware_1.errorHandler(error, req, res, next);
});
var port = config.PORT || 5000;
app.set('port', port);
app.listen(port, function () {
    console.log("Untapped Pool app successfully started on " + port);
});
//# sourceMappingURL=index.js.map
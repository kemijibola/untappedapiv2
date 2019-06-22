"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var keys = require('../config/keys');
var Server = /** @class */ (function () {
    // private port: number =
    //   process.env['port'] !== undefined ? process.env['port'] : keys.port;
    function Server(app) {
        this.app = app;
        console.log(keys['PORT']);
    }
    Server.prototype.configParser = function () {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
    };
    return Server;
}());
exports.Server = Server;

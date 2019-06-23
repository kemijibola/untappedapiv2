"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var controller_1 = require("../decorators/controller");
require("../controllers");
var config = module.require('../config/keys');
var Database_1 = require("../utils/lib/data/Database");
var MongoDb_1 = require("../utils/lib/data/MongoDb");
var Server = /** @class */ (function () {
    function Server(app) {
        this.app = app;
        if (!app) {
            throw new Error('The app has not been started.');
        }
        if (config.PORT < 0 && config.PORT > 65535) {
            throw new Error('Please provide a valid port');
        }
        this.configApp();
    }
    Server.prototype.configApp = function () {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(controller_1.router);
        this.init();
    };
    Server.prototype.init = function () {
        var params = {
            uri: config.DATABASE_HOST + "/" + config.DATABASE_NAME
        };
        this.app.listen(config.PORT, function () {
            console.log("Server started successfully on " + config.PORT);
        });
        var db = new Database_1.DbServer(new MongoDb_1.Mongo());
        db.createConnection(params);
    };
    return Server;
}());
exports.Server = Server;

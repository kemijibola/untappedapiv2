"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const config = module.require('../config/keys');
const Database_1 = require("../utils/lib/data/Database");
const MongoDb_1 = require("../utils/lib/data/MongoDb");
const AppRouter_1 = require("../AppRouter");
require("../controllers");
class Server {
    constructor(app) {
        this.app = app;
        if (!app) {
            throw new Error('The app has not been started.');
        }
        if (config.PORT < 1 || config.PORT > 65535) {
            throw new Error('Please provide a valid port between 1 - 65535');
        }
        this.configApp();
    }
    configApp() {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(AppRouter_1.AppRouter.getInstance);
        this.init();
    }
    init() {
        const params = {
            uri: `${config.DATABASE_HOST}/${config.DATABASE_NAME}`
        };
        const db = new Database_1.DbServer(new MongoDb_1.Mongo());
        db.createConnection(params);
        this.app.listen(config.PORT, () => {
            console.log(`Server started successfully on ${config.PORT}`);
        });
    }
}
exports.Server = Server;

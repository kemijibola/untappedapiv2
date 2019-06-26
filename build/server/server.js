"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = module.require('../config/keys');
const Database_1 = require("../utils/lib/data/Database");
const MongoDb_1 = require("../utils/lib/data/MongoDb");
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

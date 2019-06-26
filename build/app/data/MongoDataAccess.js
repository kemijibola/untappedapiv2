"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const config = module.require('../../config/keys');
class MongodataAccess {
    constructor() {
        MongodataAccess.connect();
    }
    static connect() {
        if (this.mongooseInstance)
            return this.mongooseInstance;
        this.mongooseConnection = mongoose_1.default.connection;
        this.mongooseConnection.once('open', () => {
            console.log('Connected to mongodb');
        });
        const params = {
            uri: `${config.DATABASE_HOST}/${config.DATABASE_NAME}`
        };
        this.mongooseInstance = mongoose_1.default.connect(params.uri);
        return this.mongooseInstance;
    }
    static disconnect() {
        this.mongooseConnection.close();
    }
}
MongodataAccess.connect();
module.exports = MongodataAccess;

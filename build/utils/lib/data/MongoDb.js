"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
class Mongo {
    constructor() {
        this.connection = mongoose_1.default.connection;
        this.models = {};
    }
    connect(params) {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.connect(params.uri, { useNewUrlParser: true }, err => {
            if (err) {
                console.log(`Error trying to connect to database: ${err}`);
            }
            else {
                this.connection = mongoose_1.default.connection;
                console.log('Database service successfully started');
            }
        });
    }
    getConnection() {
        if (this.connection === null) {
        }
        return this.connection;
    }
    disconnect() {
        this.connection.close();
    }
}
exports.Mongo = Mongo;

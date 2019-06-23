"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var Mongo = /** @class */ (function () {
    function Mongo() {
        this.connection = mongoose_1.default.connection;
        this.models = {};
    }
    Mongo.prototype.connect = function (params) {
        var _this = this;
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.connect(params.uri, { useNewUrlParser: true }, function (err) {
            if (err) {
                console.log("Error trying to connect to database: " + err);
            }
            else {
                _this.connection = mongoose_1.default.connection;
                console.log('Database service successfully started');
            }
        });
    };
    Mongo.prototype.getConnection = function () {
        if (this.connection === null) {
        }
        return this.connection;
    };
    Mongo.prototype.disconnect = function () {
        this.connection.close();
    };
    return Mongo;
}());
exports.Mongo = Mongo;

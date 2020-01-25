"use strict";
// import mongoose from 'mongoose';
var Mongoose = require("mongoose");
var Environment_1 = require("../models/interfaces/custom/Environment");
var config = module.require("../../config/keys");
var MongodataAccess = /** @class */ (function () {
    function MongodataAccess() {
        MongodataAccess.connect();
    }
    MongodataAccess.connect = function () {
        if (this.mongooseInstance) {
            return this.mongooseInstance;
        }
        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.once("open", function () {
            console.log("Connected to mongodb");
        });
        Mongoose.Promise = global.Promise;
        this.mongooseInstance = Mongoose.connect(this.dbUri, {
            useNewUrlParser: true,
            useCreateIndex: true
        });
        return this.mongooseInstance;
    };
    MongodataAccess.disconnect = function () {
        this.mongooseConnection.close();
    };
    Object.defineProperty(MongodataAccess, "dbUri", {
        get: function () {
            var dbUri = "";
            switch (config.NODE_ENV) {
                case Environment_1.Environment.PRODUCTION:
                    dbUri = "";
                    break;
                case Environment_1.Environment.STAGING:
                    dbUri = "mongodb://" + config.DATABASE_USER + ":" + config.DATABASE_PASSWORD + "@" + config.DATABASE_HOST + ":" + config.DATABASE_PORT + "/" + config.DATABASE_NAME;
                    break;
                default:
                    dbUri = config.DATABASE_HOST + "/" + config.DATABASE_NAME;
            }
            return dbUri;
        },
        enumerable: true,
        configurable: true
    });
    return MongodataAccess;
}());
MongodataAccess.connect();
Object.seal(MongodataAccess);
module.exports = MongodataAccess;
//# sourceMappingURL=MongodataAccess.js.map
"use strict";
// import mongoose from 'mongoose';
var Mongoose = require("mongoose");
var config = module.require('../../config/keys');
var MongodataAccess = /** @class */ (function () {
    function MongodataAccess() {
        MongodataAccess.connect();
    }
    MongodataAccess.connect = function () {
        if (this.mongooseInstance) {
            return this.mongooseInstance;
        }
        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.once('open', function () {
            console.log('Connected to mongodb');
        });
        var params = {
            uri: config.DATABASE_HOST + "/" + config.DATABASE_NAME
        };
        this.mongooseInstance = Mongoose.connect(params.uri, {
            useNewUrlParser: true
        });
        return this.mongooseInstance;
    };
    MongodataAccess.disconnect = function () {
        this.mongooseConnection.close();
    };
    return MongodataAccess;
}());
MongodataAccess.connect();
module.exports = MongodataAccess;
//# sourceMappingURL=MongodataAccess.js.map
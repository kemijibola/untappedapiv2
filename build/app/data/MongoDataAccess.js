"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var mongoose_1 = __importDefault(require("mongoose"));
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
        this.mongooseConnection = mongoose_1.default.connection;
        this.mongooseConnection.once("open", function () {
            console.log("Connected to mongodb");
        });
        mongoose_1.default.Promise = global.Promise;
        MongodataAccess.setMongoProperty();
        // mongoose.connect(
        //   "mongodb://ip:port",
        //   {
        //     useNewUrlParser: true,
        //     useFindAndModify: false,
        //     useCreateIndex: true,
        //     user: "username", // IMPORTANT TO HAVE IT HERE AND NOT IN CONNECTION STRING
        //     pass: "password", // IMPORTANT TO HAVE IT HERE AND NOT IN CONNECTION STRING
        //     dbName: "database-name", // IMPORTANT TO HAVE IT HERE AND NOT IN CONNECTION STRING
        //   },
        //   (err) => {
        //     throw err;
        //   }
        // );
        this.mongooseInstance = mongoose_1.default.connect(this.dbUri, {
            useNewUrlParser: true,
            useCreateIndex: true,
        });
        return this.mongooseInstance;
    };
    MongodataAccess.setMongoProperty = function () {
        mongoose_1.default.set("useFindAndModify", false);
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
                    // dbUri = `mongodb://${config.DATABASE_USER}:${config.DATABASE_PASSWORD}@${config.DATABASE_HOST}:${config.DATABASE_PORT}/${config.DATABASE_NAME}`;
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
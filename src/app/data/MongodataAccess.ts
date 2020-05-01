import mongoose from "mongoose";
// import Mongoose = require("mongoose");
import { Connection } from "../models/interfaces/custom/Connection";
import { AppConfig } from "../models/interfaces/custom/AppConfig";
import { Environment } from "../models/interfaces/custom/Environment";
const config: AppConfig = module.require("../../config/keys");

class MongodataAccess {
  static mongooseInstance: any;
  static mongooseConnection: mongoose.Connection;

  constructor() {
    MongodataAccess.connect();
  }

  static connect(): mongoose.Connection {
    if (this.mongooseInstance) {
      return this.mongooseInstance;
    }

    this.mongooseConnection = mongoose.connection;
    this.mongooseConnection.once("open", () => {
      console.log("Connected to mongodb");
    });

    mongoose.Promise = global.Promise;
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

    this.mongooseInstance = mongoose.connect(this.dbUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    return this.mongooseInstance;
  }

  private static setMongoProperty() {
    mongoose.set("useFindAndModify", false);
  }

  static disconnect(): void {
    this.mongooseConnection.close();
  }

  private static get dbUri(): string {
    let dbUri: string = "";
    switch (config.NODE_ENV) {
      case Environment.PRODUCTION:
        dbUri = "";
        break;
      case Environment.STAGING:
        dbUri = `mongodb://${config.DATABASE_USER}:${config.DATABASE_PASSWORD}@${config.DATABASE_HOST}:${config.DATABASE_PORT}/${config.DATABASE_NAME}`;
        break;
      default:
        // dbUri = `mongodb://${config.DATABASE_USER}:${config.DATABASE_PASSWORD}@${config.DATABASE_HOST}:${config.DATABASE_PORT}/${config.DATABASE_NAME}`;
        dbUri = `${config.DATABASE_HOST}/${config.DATABASE_NAME}`;
    }
    return dbUri;
  }
}

MongodataAccess.connect();
Object.seal(MongodataAccess);
export = MongodataAccess;

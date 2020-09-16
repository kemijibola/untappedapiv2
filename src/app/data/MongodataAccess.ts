import { PlatformError } from "./../../utils/error/ApplicationError";
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
    try {
      this.mongooseInstance = mongoose.connect(this.dbUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
      });
      return this.mongooseInstance;
    } catch (err) {
      throw new PlatformError({
        code: 500,
        message: "An unexpected error occured, Please try again",
      });
    }
  }

  private static setMongoProperty() {
    //m ongoose.set("useFindAndModify", false);
    // mongoose.set("useUnifiedTopology", true);
  }

  static disconnect(): void {
    this.mongooseConnection.close();
  }

  private static get dbUri(): string {
    let dbUri: string = "";
    switch (config.NODE_ENV) {
      case Environment.production:
        dbUri = `mongodb://${config.DATABASE_USER}:${config.DATABASE_PASSWORD}@${config.DATABASE_HOST}:${config.DATABASE_PORT}/${config.DATABASE_NAME}`;
        break;
      case Environment.staging:
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

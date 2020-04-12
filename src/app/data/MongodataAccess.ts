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
    mongoose.set("useUnifiedTopology", true);
    mongoose.set("useFindAndModify", false);
    this.mongooseInstance = mongoose.connect(this.dbUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    return this.mongooseInstance;
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

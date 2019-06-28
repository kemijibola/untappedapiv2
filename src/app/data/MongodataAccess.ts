// import mongoose from 'mongoose';
import Mongoose = require('mongoose');
import { Connection } from '../models/interfaces/custom/Connection';
import { AppConfig } from '../models/interfaces/custom/AppConfig';
const config: AppConfig = module.require('../../config/keys');

class MongodataAccess {
  static mongooseInstance: any;
  static mongooseConnection: Mongoose.Connection;

  constructor() {
    MongodataAccess.connect();
  }

  static connect(): Mongoose.Connection {
    if (this.mongooseInstance) {
      return this.mongooseInstance;
    }

    this.mongooseConnection = Mongoose.connection;
    this.mongooseConnection.once('open', () => {
      console.log('Connected to mongodb');
    });

    const params: Connection = {
      uri: `${config.DATABASE_HOST}/${config.DATABASE_NAME}`
    };

    this.mongooseInstance = Mongoose.connect(params.uri, {
      useNewUrlParser: true
    });
    return this.mongooseInstance;
  }

  static disconnect(): void {
    this.mongooseConnection.close();
  }
}

MongodataAccess.connect();
export = MongodataAccess;

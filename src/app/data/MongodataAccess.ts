import mongoose from 'mongoose';
import { Connection } from '../models/interfaces/custom/Connection';
import { AppConfig } from '../models/interfaces/custom/AppConfig';
const config: AppConfig = module.require('../../config/keys');

class MongodataAccess {
  static mongooseInstance: any;
  static mongooseConnection: mongoose.Connection;

  constructor() {
    MongodataAccess.connect();
  }

  static connect(): mongoose.Connection {
    if (this.mongooseInstance) return this.mongooseInstance;

    this.mongooseConnection = mongoose.connection;
    this.mongooseConnection.once('open', () => {
      console.log('Connected to mongodb');
    });

    const params: Connection = {
      uri: `${config.DATABASE_HOST}/${config.DATABASE_NAME}`
    };
    this.mongooseInstance = mongoose.connect(params.uri);
    return this.mongooseInstance;
  }

  static disconnect(): void {
    this.mongooseConnection.close();
  }
}

MongodataAccess.connect();
export = MongodataAccess;

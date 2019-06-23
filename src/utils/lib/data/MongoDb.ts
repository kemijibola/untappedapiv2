import { Database } from './Database';
import mongoose from 'mongoose';
import * as mongodb from 'mongodb';
import _ from 'underscore';
import { Mongoose } from 'mongoose';
import { Connection } from '../../../interfaces/Connection';
const Schema = mongoose.Schema;

export class Mongo implements Database {
  private connection = mongoose.connection;
  private models = {};

  constructor() {}

  connect(params: Connection): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(params.uri, { useNewUrlParser: true }, err => {
      if (err) {
        console.log(`Error trying to connect to database: ${err}`);
      } else {
        this.connection = mongoose.connection;
        console.log('Database service successfully started');
      }
    });
  }

  getConnection(): mongoose.Connection {
    if (this.connection === null) {
    }
    return this.connection;
  }

  disconnect(): void {
    this.connection.close();
  }
}

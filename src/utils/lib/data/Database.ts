import { Connection } from '../../../interfaces/Connection';
import mongoose from 'mongoose';

export interface Database {
  disconnect(): void;
  connect(connection: Connection): void;
}

export class DbServer {
  constructor(public db: Database) {}

  createConnection(params: Connection): void {
    this.db.connect(params);
  }
  closeConnection(): void {
    this.db.disconnect();
  }
}

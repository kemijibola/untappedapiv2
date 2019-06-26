import { Connection } from '../../../app/models/interfaces/custom/Connection';

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

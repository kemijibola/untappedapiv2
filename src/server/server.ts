import { Express } from 'express';
import bodyParser from 'body-parser';
import { router } from '../decorators/controller';

import '../controllers';
import { AppConfig } from '../interfaces/AppConfig';
const config: AppConfig = module.require('../config/keys');

import { DbServer } from '../utils/lib/data/Database';
import { Mongo } from '../utils/lib/data/MongoDb';
import { Connection } from '../interfaces/Connection';

export class Server {
  constructor(private app: Express) {
    if (!app) {
      throw new Error('The app has not been started.');
    }
    if (config.PORT < 0 && config.PORT > 65535) {
      throw new Error('Please provide a valid port');
    }
    this.configApp();
  }

  private configApp(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(router);

    this.init();
  }

  private init(): void {
    const params: Connection = {
      uri: `${config.DATABASE_HOST}/${config.DATABASE_NAME}`
    };
    this.app.listen(config.PORT, () => {
      console.log(`Server started successfully on ${config.PORT}`);
    });
    const db = new DbServer(new Mongo());
    db.createConnection(params);
  }
}

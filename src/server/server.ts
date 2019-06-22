import { Express } from 'express';
import bodyParser from 'body-parser';
const keys = require('../config/keys');

export class Server {
  // private port: number =
  //   process.env['port'] !== undefined ? process.env['port'] : keys.port;
  constructor(private app: Express) {
    console.log(keys['PORT']);
  }

  configParser(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  // private appInit(): void {
  //   console.log(this.port);
  //   this.app.listen(this.port, () => {
  //     console.log(`Server started successfully on ${this.port}`);
  //   });
  // }
}

import express from 'express';
import { AppConfig } from './app/models/interfaces/custom/AppConfig';
const config: AppConfig = module.require('./config/keys');
import MiddlewaresBase = require('./middlewares/base/MiddlewaresBase');
import './controllers';

const app = express();
const port = config.PORT || 5000;
app.set('port', port);
app.use(MiddlewaresBase.configuration);

app.listen(port, () => {
  console.log(`Untapped Pool app successfully started on ${port}`);
});

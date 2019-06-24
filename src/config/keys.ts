import dotenv from 'dotenv';
dotenv.config();
import { Environment } from '../interfaces/Environment';
import * as development from './development.json';
import * as ci from './ci.json';
import { AppConfig } from '../interfaces/AppConfig';

let environment: string = process.env.NODE_ENV || '';
let envs: AppConfig = {
  PORT: 0,
  RSA_PUBLIC_KEY: '',
  DATABASE_HOST: '',
  DATABASE_NAME: '',
  DATABASE_PASSWORD: '',
  DATABASE_USER: '',
  REDIS_HOST: '',
  REDIS_PORT: 0,
  RSA_PRIVATE_KEY: '',
  RSA_KEYID: '',
  RSA_TYPE: ''
};

switch (environment) {
  case Environment.CI:
    envs = Object.assign(envs, ci);
    module.exports = envs;
    break;
  case Environment.PRODUCTION:
    // envs = Object.assign(envs, production);
    // module.exports = envs['default'];
    break;
  case Environment.STAGING:
    // envs = Object.assign(envs, development);
    // module.exports = envs;
    break;
  default:
    envs = Object.assign(envs, development);
    module.exports = envs;
    break;
}

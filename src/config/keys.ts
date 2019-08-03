import dotenv from 'dotenv';
dotenv.config();
import { Environment } from '../app/models/interfaces/custom/Environment';
import * as development from './development.json';
import * as ci from './ci.json';
import { AppConfig } from '../app/models/interfaces/custom/AppConfig';

let environment: string = process.env.NODE_ENV || '';
let envs: AppConfig = {
  PORT: 0,
  DATABASE_HOST: '',
  DATABASE_NAME: '',
  DATABASE_PASSWORD: '',
  DATABASE_USER: '',
  REDIS_HOST: '',
  REDIS_PORT: 0,
  RSA_PUBLIC: [
    {
      Secret: '',
      key: '',
      rsaAlgType: ''
    }
  ],
  RSA_PRIVATE: [
    {
      Secret: '',
      key: '',
      rsaAlgType: ''
    }
  ],
  ISSUER: '',
  AUTH_EXPIRESIN: '',
  MAIL_EXPIRESIN: '',
  APP_BUCKET: {
    bucket: '',
    access_key_id: '',
    secret_access_key: '',
    region: '',
    bucketUrl: ''
  },
  SCHEDULED_EMAIL_SQS: {
    access_key_id: '',
    secret_access_key: '',
    version: '',
    region: '',
    accountId: 0,
    url: '',
    queueName: ''
  },
  SERVERLESS: {
    access_key_id: '',
    secret_access_key: ''
  }
};

switch (environment) {
  case Environment.CI:
    Object.seal(ci);
    module.exports = ci;
    break;
  case Environment.PRODUCTION:
    // Object.seal(production);
    // module.exports = production;
    break;
  case Environment.STAGING:
    // Object.seal(staging);
    // module.exports = staging;
    break;
  default:
    Object.seal(development);
    module.exports = development;
    break;
}

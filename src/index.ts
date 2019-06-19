import express from 'express';
import { AppConfig } from './interfaces/Config';
import * as config from './config/bucketConfig';
import { S3 } from './utils/S3';
import { Server } from './server/server';

process.env.node_env = process.env.node_env || 'development';

const appConfig: AppConfig = {
  bucket: {
    bucketName: config.default['app-bucket'].bucket,
    key: config.default['app-bucket'].bucket_key,
    accessKeyId: config.default['app-bucket'].access_key_id,
    secretAccessKey: config.default['app-bucket'].secret_access_key,
    region: config.default['app-bucket'].region
  }
};

new S3(appConfig.bucket).setAppConfig();

const app = express();
new Server(app);

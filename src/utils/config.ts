import { Environment } from './globalEnums';
import dotenv from 'dotenv';
dotenv.config();


import fs, { writeFile } from 'fs';

let path: string = '';
let environment: string = process.env.NODE_ENV || '';

switch (environment) {
  case Environment.DEVELOPMENT:
    path = `${__dirname}/../config/development`;
    break;
  case Environment.CI:
    path = './src/config/ci.ts';
    break;
  case Environment.PRODUCTION:
    path = `${__dirname}/../config/production`;
    break;
  default:
    path = `${__dirname}/../config/development`;
}
const result = dotenv.config({ path: path });
console.log(result);
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;
console.log(envs);

module.exports = envs;



// export const APP_ID = process.env.APP_ID;
// export const LOG_LEVEL = process.env.LOG_LEVEL;

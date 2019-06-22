"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var globalEnums_1 = require("./globalEnums");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var path = '';
var environment = process.env.NODE_ENV || '';
switch (environment) {
    case globalEnums_1.Environment.DEVELOPMENT:
        path = __dirname + "/../config/development";
        break;
    case globalEnums_1.Environment.CI:
        path = './src/config/ci.ts';
        break;
    case globalEnums_1.Environment.PRODUCTION:
        path = __dirname + "/../config/production";
        break;
    default:
        path = __dirname + "/../config/development";
}
var result = dotenv_1.default.config({ path: path });
console.log(result);
if (result.error) {
    throw result.error;
}
var envs = result.parsed;
console.log(envs);
module.exports = envs;
// export const APP_ID = process.env.APP_ID;
// export const LOG_LEVEL = process.env.LOG_LEVEL;

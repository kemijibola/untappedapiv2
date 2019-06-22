"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var globalEnums_1 = require("../utils/globalEnums");
var envs;
var environment = process.env.NODE_ENV || '';
switch (environment) {
    case globalEnums_1.Environment.CI:
        envs = require('./ci');
        module.exports = envs['default'];
        break;
    case globalEnums_1.Environment.PRODUCTION:
        envs = require('./production');
        module.exports = envs['default'];
        break;
    case globalEnums_1.Environment.STAGING:
        envs = require('./staging');
        module.exports = envs['default'];
        break;
    default:
        envs = require('./development');
        module.exports = envs['default'];
        break;
}

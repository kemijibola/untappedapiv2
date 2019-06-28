"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Environment_1 = require("../app/models/interfaces/custom/Environment");
const development = __importStar(require("./development.json"));
const ci = __importStar(require("./ci.json"));
let environment = process.env.NODE_ENV || '';
let envs = {
    PORT: 0,
    RSA_PUBLIC_KEY: {},
    DATABASE_HOST: '',
    DATABASE_NAME: '',
    DATABASE_PASSWORD: '',
    DATABASE_USER: '',
    REDIS_HOST: '',
    REDIS_PORT: 0,
    RSA_PRIVATE_KEY: {},
    RSA_KEYID: '',
    RSA_ALG_TYPE: '',
    ISSUER: '',
    AUTH_EXPIRESIN: '',
    MAIL_EXPIRESIN: ''
};
switch (environment) {
    case Environment_1.Environment.CI:
        Object.seal(ci);
        module.exports = ci;
        break;
    case Environment_1.Environment.PRODUCTION:
        // Object.seal(production);
        // module.exports = production;
        break;
    case Environment_1.Environment.STAGING:
        // Object.seal(staging);
        // module.exports = staging;
        break;
    default:
        Object.seal(development);
        module.exports = development;
        break;
}

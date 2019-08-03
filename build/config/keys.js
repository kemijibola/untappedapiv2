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
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var Environment_1 = require("../app/models/interfaces/custom/Environment");
var development = __importStar(require("./development.json"));
var ci = __importStar(require("./ci.json"));
var environment = process.env.NODE_ENV || '';
var envs = {
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
//# sourceMappingURL=keys.js.map
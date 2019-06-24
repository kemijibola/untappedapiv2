"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Development {
    constructor(environment) {
        this.environment = environment;
    }
    setConfig(appConfig) {
        console.log(appConfig);
        module.exports = {
            NODE_ENV: this.environment,
            RSA_PUBLIC_KEY: appConfig.RSA_PUBLIC_KEY,
            PORT: appConfig.PORT,
            APP_DB: {
                DATABASE_HOST: appConfig.DATABASE_HOST,
                DATABASE_NAME: appConfig.DATABASE_NAME,
                DATABASE_USER: appConfig.DATABASE_USER,
                DATABASE_PASSWORD: appConfig.DATABASE_PASSWORD
            },
            REDIS_HOST: appConfig.REDIS_HOST,
            REDIS_PORT: appConfig.REDIS_PORT,
            TOKEN_SECRET: {
                RSA_PUBLIC_KEY: appConfig.RSA_PUBLIC_KEY,
                RSA_PRIVATE_KEY: appConfig.RSA_PRIVATE_KEY,
                RSA_KEYID: appConfig.RSA_KEYID,
                RSA_TYPE: appConfig.RSA_TYPE
            }
        };
    }
}
exports.Development = Development;

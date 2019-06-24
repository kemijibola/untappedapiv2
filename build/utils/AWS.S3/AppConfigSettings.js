"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class AppConfigSettings {
    constructor() {
        this.configParams = { Bucket: '', Key: '' };
        this.appConfig = {
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
        this.port = 0;
    }
    getObject(params, s3) {
        this.configParams = Object.assign(this.configParams, params);
        s3.getObject(this.configParams, (err, data) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                // do nothing
            }
            else {
                data = JSON.parse(data.Body.toString());
                console.log(3);
                for (const i in data) {
                    process.env[i] = data[i];
                }
                console.log(2);
                console.log('42', process.env.PORT);
            }
        }));
        return {};
    }
    putObject(objectParams, s3) {
        return {};
    }
}
exports.AppConfigSettings = AppConfigSettings;

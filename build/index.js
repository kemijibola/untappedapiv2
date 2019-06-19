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
var express_1 = __importDefault(require("express"));
var config = __importStar(require("./config/bucketConfig"));
var S3_1 = require("./utils/S3");
var server_1 = require("./server/server");
process.env.node_env = process.env.node_env || 'development';
var appConfig = {
    bucket: {
        bucketName: config.default['app-bucket'].bucket,
        key: config.default['app-bucket'].bucket_key,
        accessKeyId: config.default['app-bucket'].access_key_id,
        secretAccessKey: config.default['app-bucket'].secret_access_key,
        region: config.default['app-bucket'].region
    }
};
new S3_1.S3(appConfig.bucket).setAppConfig();
var app = express_1.default();
new server_1.Server(app);

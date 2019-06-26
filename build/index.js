"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Server_1 = require("./server/Server");
const AWS_1 = require("./utils/Cloud/AWS");
const app = express_1.default();
new Server_1.Server(app);
const bucketParams = {
    accessKeyId: '123',
    secretAccessKey: 'kdjd',
    region: 'kemi'
};
const objParam = {
    Bucket: 'bucket-124',
    Key: 'testing'
};
const aws = AWS_1.AWS.setUpCloud(bucketParams);
console.log(aws.getObject(objParam));

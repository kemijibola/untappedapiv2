"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = __importStar(require("aws-sdk"));
class AwsStorage {
    constructor(bucket) {
        this.configParams = { Bucket: '', Key: '' };
        AWS.config.update({
            region: bucket.region
        });
        this.instance = new AWS.S3({
            accessKeyId: bucket.accessKeyId,
            secretAccessKey: bucket.secretAccessKey
        });
    }
    getObject(params) {
        this.configParams = Object.assign(this.configParams, params);
        this.instance.getObject(this.configParams, function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(data.Body);
            }
        });
        return 'success';
    }
}
exports.AwsStorage = AwsStorage;
class Model {
    constructor(storage) {
        this.storage = storage;
    }
    // getObject(params: AppConfigParams): string {
    //   return this.storage.getObject(params)
    // }
    getObject() {
        console.log('hi there');
    }
    sendMessage() {
        return 'send message works';
    }
}
exports.Model = Model;
const config = {
    accessKeyId: 'abcd',
    secretAccessKey: 'kdsjkd',
    region: 'ibadan'
};
class AWSS extends Model {
    static setUpCloud(config) {
        return new AWSS(new AwsStorage(config));
    }
}
exports.AWSS = AWSS;
// pass params;
const aws = AWSS.setUpCloud(config);
console.log(aws.getObject());

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
        this.objParams = { Bucket: '', Key: '' };
        AWS.config.update({
            region: bucket.region
        });
        this.s3 = new AWS.S3({
            accessKeyId: bucket.accessKeyId,
            secretAccessKey: bucket.secretAccessKey
        });
    }
    getObject(params) {
        console.log(params);
        this.objParams = Object.assign(this.objParams, params);
        this.s3.getObject(this.objParams, function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(data.Body);
            }
        });
        return 'get obj works';
    }
    putObject(params) { }
}
exports.AwsStorage = AwsStorage;

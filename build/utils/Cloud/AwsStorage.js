"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var AWS = __importStar(require("aws-sdk"));
var AwsStorage = /** @class */ (function () {
    function AwsStorage(bucket) {
        this.objParams = { Bucket: '', Key: '' };
        AWS.config.update({
            region: bucket.region
        });
        this.s3 = new AWS.S3({
            accessKeyId: bucket.accessKeyId,
            secretAccessKey: bucket.secretAccessKey
        });
    }
    AwsStorage.prototype.getObject = function (params) {
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
    };
    AwsStorage.prototype.putObject = function (params) { };
    return AwsStorage;
}());
exports.AwsStorage = AwsStorage;
//# sourceMappingURL=AwsStorage.js.map
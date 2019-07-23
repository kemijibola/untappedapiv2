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
        this.bucket = bucket;
        this.objParams = {
            Bucket: '',
            Key: ''
        };
        AWS.config.update({
            region: bucket.region
        });
        this.s3 = new AWS.S3({
            accessKeyId: this.bucket.accessKeyId,
            secretAccessKey: this.bucket.secretAccessKey
        });
    }
    AwsStorage.setup = function (config) {
        return new AwsStorage(config);
    };
    // change this to substitute real types
    AwsStorage.prototype.fetch = function (params) {
        var _this = this;
        this.objParams = Object.assign(this.objParams, params);
        return new Promise(function (resolve, reject) {
            _this.s3.getObject(_this.objParams, function (err, data) {
                if (err)
                    reject(err);
                resolve(data.Body);
            });
        });
    };
    AwsStorage.prototype.put = function () { };
    return AwsStorage;
}());
Object.seal(AwsStorage);
exports = AwsStorage;
// // AWS Storage implementation
// const config: Bucket = {
//   accessKeyId: '',
//   secretAccessKey: '',
//   region: ''
// }
// const a = AwsStorage.setup(config)
//# sourceMappingURL=AwsStorage.js.map
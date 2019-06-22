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
var S3Resource = /** @class */ (function () {
    function S3Resource(bucket, resource) {
        this.bucket = bucket;
        this.resource = resource;
        AWS.config.update({
            region: bucket.region
        });
        this.s3 = new AWS.S3({
            accessKeyId: bucket.accessKeyId,
            secretAccessKey: bucket.secretAccessKey
        });
    }
    S3Resource.prototype.getResource = function (params) {
        this.resource.getObject(params, this.s3);
    };
    S3Resource.prototype.putResource = function (params) {
        this.resource.putObject(params, this.s3);
    };
    S3Resource.prototype.listBuckets = function (callback) {
        this.s3.listBuckets(function (err, data) {
            if (err) {
            }
            else {
                if (data.Buckets) {
                    for (var i = 0; i < data.Buckets.length; i++) {
                        console.log(data.Buckets[i].Name);
                    }
                }
            }
            callback(err);
        });
    };
    S3Resource.prototype.createBucket = function (params, callback) {
        this.s3.createBucket(params, function (err, data) {
            if (err) {
                // handle error
            }
            callback(err);
        });
    };
    S3Resource.prototype.deleteBucket = function (params, callback) {
        console.log("\nDeleting the bucket named '" + params.Bucket + "'...\n");
        this.s3.deleteBucket(params, function (err, data) {
            if (err) {
                // handle error here
            }
            callback(err);
        });
    };
    return S3Resource;
}());
exports.S3Resource = S3Resource;

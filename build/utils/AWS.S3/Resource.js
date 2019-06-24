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
class S3Resource {
    constructor(bucket, resource) {
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
    getResource(params) {
        this.resource.getObject(params, this.s3);
    }
    putResource(params) {
        this.resource.putObject(params, this.s3);
    }
    listBuckets(callback) {
        this.s3.listBuckets(function (err, data) {
            if (err) {
            }
            else {
                if (data.Buckets) {
                    for (let i = 0; i < data.Buckets.length; i++) {
                        console.log(data.Buckets[i].Name);
                    }
                }
            }
            callback(err);
        });
    }
    createBucket(params, callback) {
        this.s3.createBucket(params, function (err, data) {
            if (err) {
                // handle error
            }
            callback(err);
        });
    }
    deleteBucket(params, callback) {
        console.log("\nDeleting the bucket named '" + params.Bucket + "'...\n");
        this.s3.deleteBucket(params, function (err, data) {
            if (err) {
                // handle error here
            }
            callback(err);
        });
    }
}
exports.S3Resource = S3Resource;

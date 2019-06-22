"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var AWS = __importStar(require("aws-sdk"));
var S3 = /** @class */ (function () {
    function S3(params) {
        this.params = params;
        AWS.config.update({
            region: params.region
        });
        this.s3 = new AWS.S3({
            accessKeyId: params.accessKeyId,
            secretAccessKey: params.secretAccessKey
        });
    }
    // Create a bucket in this AWS Region.
    S3.prototype.createBucket = function (callback) {
        var bucketParams = {
            Bucket: this.params.bucketName,
            CreateBucketConfiguration: {
                LocationConstraint: this.params.region
            }
        };
        this.s3.createBucket(bucketParams, function (err, data) {
            if (err) {
                // handle error
            }
            callback(err);
        });
    };
    // List of all available buckets in this AWS Region.
    S3.prototype.listBuckets = function (callback) {
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
    // Delete the bucket
    S3.prototype.deleteBucket = function (callback) {
        var bucketParams = {
            Bucket: this.params.bucketName
        };
        console.log("\nDeleting the bucket named '" + this.params.bucketName + "'...\n");
        this.s3.deleteBucket(bucketParams, function (err, data) {
            if (err) {
                // handle error here
            }
            callback(err);
        });
    };
    return S3;
}());
exports.S3 = S3;

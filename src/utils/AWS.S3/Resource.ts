import * as AWS from 'aws-sdk';
import { S3BucketParams } from '../../interfaces/S3';
import { Bucket } from '../../interfaces/Bucket';

interface S3 {
  listBuckets(callback: any): void;
  createBucket(params: S3BucketParams, callback: any): void;
  deleteBucket(params: S3BucketParams, callback: any): void;
}
export interface Resource {
  getObject<T, K>(resourceParams: T, s3: AWS.S3): K;
  putObject<T, K>(resourceParams: T, s3: AWS.S3): K;
}

export class S3Resource implements S3 {
  private s3: AWS.S3;

  constructor(public bucket: Bucket, public resource: Resource) {
    AWS.config.update({
      region: bucket.region
    });
    this.s3 = new AWS.S3({
      accessKeyId: bucket.accessKeyId,
      secretAccessKey: bucket.secretAccessKey
    });
  }

  getResource<T>(params: T): void {
    this.resource.getObject(params, this.s3);
  }

  putResource<T>(params: T): void {
    this.resource.putObject(params, this.s3);
  }
  listBuckets(callback: any): void {
    this.s3.listBuckets(function(err: any, data: any) {
      if (err) {
      } else {
        if (data.Buckets) {
          for (let i: number = 0; i < data.Buckets.length; i++) {
            console.log(data.Buckets[i].Name);
          }
        }
      }
      callback(err);
    });
  }
  createBucket(params: S3BucketParams, callback: any): void {
    this.s3.createBucket(params, function(err: any, data: any) {
      if (err) {
        // handle error
      }
      callback(err);
    });
  }

  deleteBucket(params: S3BucketParams, callback: any): void {
    console.log("\nDeleting the bucket named '" + params.Bucket + "'...\n");

    this.s3.deleteBucket(params, function(err: any, data: any) {
      if (err) {
        // handle error here
      }
      callback(err);
    });
  }
}

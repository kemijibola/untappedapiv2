import * as AWS from 'aws-sdk';
import { S3Params } from '../interfaces/S3';

export class S3 {
  private s3: AWS.S3;

  constructor(public params: S3Params) {
    AWS.config.update({
      region: params.region
    });

    this.s3 = new AWS.S3({
      accessKeyId: params.accessKeyId,
      secretAccessKey: params.secretAccessKey
    });
  }

  setAppConfig(): void {
    let params = {
      Bucket: this.params.bucketName || '',
      Key: this.params.key || ''
    };
    this.s3.getObject(params, function(err: AWS.AWSError, data: any) {
      if (err) {
        // do thing
        // log error
      } else {
        try {
          if (data.Body) {
            data = JSON.parse(data.Body.toString());
            for (const i in data) {
              process.env[i] = data[i];
            }
          }
          // if network fails, set to default
        } catch (err) {
          // do nothing
          // log error
        }
      }
    });
  }

  // Create a bucket in this AWS Region.
  createBucket(callback: any): void {
    const bucketParams: any = {
      Bucket: this.params.bucketName,
      CreateBucketConfiguration: {
        LocationConstraint: this.params.region
      }
    };
    this.s3.createBucket(bucketParams, function(err: any, data: any) {
      if (err) {
        // handle error
      }
      callback(err);
    });
  }

  // List of all available buckets in this AWS Region.
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

  // Delete the bucket
  deleteBucket(callback: any): void {
    const bucketParams: any = {
      Bucket: this.params.bucketName
    };
    console.log(
      "\nDeleting the bucket named '" + this.params.bucketName + "'...\n"
    );

    this.s3.deleteBucket(bucketParams, function(err: any, data: any) {
      if (err) {
        // handle error here
      }
      callback(err);
    });
  }
}

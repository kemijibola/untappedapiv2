import { S3Params } from './../../app/models/interfaces/custom/Bucket';
import * as AWS from 'aws-sdk';
import { IStorage } from './base/Storage';
import { GetObjectRequest } from 'aws-sdk/clients/s3';

export interface FetchParams {
  Bucket: string;
  Key: string;
}

class AwsStorage {
  private s3: AWS.S3;
  private objParams: GetObjectRequest = {
    Bucket: '',
    Key: ''
  };
  constructor(private bucket: S3Params) {
    AWS.config.update({
      region: bucket.region
    });
    this.s3 = new AWS.S3({
      accessKeyId: this.bucket.accessKeyId,
      secretAccessKey: this.bucket.secretAccessKey
    });
  }

  static setup(config: S3Params): AwsStorage {
    return new AwsStorage(config);
  }

  // change this to substitute real types
  fetch<Bucket>(params: S3Params): Promise<string> {
    this.objParams = Object.assign(this.objParams, params);
    return new Promise((resolve, reject) => {
      // this.s3.getObject(this.objParams, function(err: any, data: any) {
      //   if (err) reject(err);
      //   resolve(data.Body);
      // });
    });
  }

  put(): void {}
}

Object.seal(AwsStorage);
exports = AwsStorage;

// // AWS Storage implementation
// const config: Bucket = {
//   accessKeyId: '',
//   secretAccessKey: '',
//   region: ''
// }

// const a = AwsStorage.setup(config)

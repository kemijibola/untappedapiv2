import * as AWS from 'aws-sdk';
import { Bucket } from '../../interfaces/Bucket';

export interface ObjectParam {
  Bucket: string;
  Key: string;
}

export class AwsStorage {
  private s3: AWS.S3;
  private objParams: ObjectParam = { Bucket: '', Key: '' };
  constructor(bucket: Bucket) {
    AWS.config.update({
      region: bucket.region
    });

    this.s3 = new AWS.S3({
      accessKeyId: bucket.accessKeyId,
      secretAccessKey: bucket.secretAccessKey
    });
  }

  getObject<ObjectParam>(params: ObjectParam): string {
    console.log(params);
    this.objParams = Object.assign(this.objParams, params);
    this.s3.getObject(this.objParams, function(err: any, data: any) {
      if (err) {
        console.log(err);
      } else {
        console.log(data.Body);
      }
    });
    return 'get obj works';
  }

  putObject<T>(params: T): void {}
}

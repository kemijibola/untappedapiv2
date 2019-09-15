import * as AWS from 'aws-sdk';
import { Storage } from '../FileUpload';
import {
  PresignedUrl,
  IFileMetaData,
  IUploadFileRequest,
  UPLOADOPERATIONS,
  SignedUrl
} from '../Helper/Upload';
import { S3Params } from '../../../app/models/interfaces/custom/Bucket';
import { AcceptedMedias, ObjectKeyString } from '../../lib';
import uuid = require('uuid');
import { Result } from '../../Result';
import { AppConfig } from '../../../app/models/interfaces/custom/AppConfig';
const config: AppConfig = module.require('../../../config/keys');
// import * as cloudConfig from '../../../config/cloudConfig.json';

export class S3Storage implements Storage {
  private s3: AWS.S3;

  constructor() {
    AWS.config.update({
      region: config.APP_BUCKET.region
    });
    this.s3 = new AWS.S3({
      accessKeyId: config.APP_BUCKET.access_key_id,
      secretAccessKey: config.APP_BUCKET.secret_access_key,
      useAccelerateEndpoint: true
    });
  }

  async putObject(data: IUploadFileRequest): Promise<Result<SignedUrl>> {
    const signedUrlExpireSeconds = 60 * 60;
    let signedUrls: SignedUrl = {
      presignedUrl: [],
      action: UPLOADOPERATIONS.ProfileImage
    };
    let signedUrl: PresignedUrl = {
      file: '',
      url: '',
      key: ''
    };
    if (data.files) {
      const filesMap: ObjectKeyString = data.files.reduce(
        (theMap: ObjectKeyString, item: IFileMetaData) => {
          let fileExtension = item.file.split('.').pop() || '';
          fileExtension = fileExtension.toLowerCase();
          // we are ensuring the user sent valid media type for processing on s3
          if (!AcceptedMedias[fileExtension]) {
            return Result.fail<PresignedUrl[]>(
              400,
              `${fileExtension} is not allowed.`
            );
          }
          theMap[item.file] = `${data.uploader}/${
            AcceptedMedias[fileExtension]
          }/${UPLOADOPERATIONS[data.action]}/${uuid()}.${fileExtension}`;

          return theMap;
        },
        {}
      );
      try {
        for (let item in filesMap) {
          const url = await this.s3.getSignedUrl('putObject', {
            Bucket: config.APP_BUCKET.bucket,
            Key: filesMap[item],
            Expires: signedUrlExpireSeconds,
            ACL: 'bucket-owner-full-control',
            ContentType: data.files[0].file_type
          });
          signedUrl = {
            file: item,
            url,
            key: filesMap[item]
          };
          signedUrls.presignedUrl = [...signedUrls.presignedUrl, signedUrl];
        }
        return Result.ok<SignedUrl>(200, signedUrls);
      } catch (err) {
        throw new Error('Internal server error occured');
      }
    }
    return Result.fail<SignedUrl>(400, 'No file uploaded.');
  }

  // async getPresignedUrls(keys: string[]): Promise<string[]> {}
}

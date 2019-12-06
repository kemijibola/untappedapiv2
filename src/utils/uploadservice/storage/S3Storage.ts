import * as AWS from "aws-sdk";
import { Storage } from "../FileUpload";
import {
  PresignedUrl,
  IFileMetaData,
  IUploadFileRequest,
  UPLOADOPERATIONS,
  SignedUrl
} from "../Helper/Upload";
import { S3Params } from "../../../app/models/interfaces/custom/Bucket";
import { AcceptedMedias, ObjectKeyString } from "../../lib";
import uuid = require("uuid");
import { Result } from "../../Result";
import { AppConfig } from "../../../app/models/interfaces/custom/AppConfig";
import { ApprovalOperationSchema } from "../../../app/data/schema/ApprovalOperation";
const config: AppConfig = module.require("../../../config/keys");
// import * as cloudConfig from '../../../config/cloudConfig.json';

AWS.config.update({
  accessKeyId: config.APP_BUCKET.access_key_id,
  secretAccessKey: config.APP_BUCKET.secret_access_key,
  region: config.APP_BUCKET.region,
  signatureVersion: "v4"
});
export class S3Storage implements Storage {
  // private s3 ;

  constructor() {
    // AWS.config.update({
    //   accessKeyId: config.APP_BUCKET.access_key_id,
    //   secretAccessKey: config.APP_BUCKET.secret_access_key,
    //   region: config.APP_BUCKET.region,
    //   signatureVersion: "v4"
    // });
    // this.s3 = new AWS.S3({
    //   useAccelerateEndpoint: true
    // });
  }

  // async getObject():
  async putObject(data: IUploadFileRequest): Promise<Result<SignedUrl>> {
    const signedUrlExpireSeconds = 60 * 60;
    let signedUrls: SignedUrl = {
      presignedUrl: [],
      action: UPLOADOPERATIONS.ProfileImage
    };
    let signedUrl: PresignedUrl = {
      file: "",
      url: "",
      key: ""
    };
    if (data.files) {
      const filesMap: ObjectKeyString = data.files.reduce(
        (theMap: any, item: IFileMetaData) => {
          let fileExtension = item.file.split(".").pop() || "";
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
          const params = {
            Bucket: config.APP_BUCKET.bucket,
            Key: filesMap[item],
            Expires: 30 * 60,
            ContentType: data.files[0].file_type
          };
          const options = {
            signatureVersion: "v4",
            region: config.APP_BUCKET.region, // same as your bucket
            endpoint: "untapped-platform-bucket.s3-accelerate.amazonaws.com",
            useAccelerateEndpoint: true
          };

          const client: AWS.S3 = new AWS.S3(options);
          const signed: string = await new Promise((resolve, reject) => {
            client.getSignedUrl("putObject", params, (err, data) => {
              if (err) reject(err);
              resolve(data);
            });
          });
          signedUrl = {
            file: item,
            url: signed,
            key: filesMap[item]
          };
          signedUrls.presignedUrl = [...signedUrls.presignedUrl, signedUrl];
        }
        return Result.ok<SignedUrl>(200, signedUrls);
      } catch (err) {
        console.log(err);
        throw new Error("Internal server error occured");
      }
    }
    return Result.fail<SignedUrl>(400, "No file uploaded.");
  }
}

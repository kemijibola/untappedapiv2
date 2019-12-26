import {
  IUploadFileRequest,
  UPLOADOPERATIONS,
  IFileMetaData,
  PresignedUrl
} from "./../../uploadservice/Helper/Upload";
import { AbstractMedia } from "../Uploader";
import * as AWS from "aws-sdk";
import request from "request";
import { AppConfig } from "../../../app/models/interfaces/custom/AppConfig";
import { SignedUrl } from "../../uploadservice/Helper/Upload";
import { Result } from "../../Result";
import { ObjectKeyString, AcceptedMedias } from "../../lib";
import uuid = require("uuid");
import { ImageEditRequest } from "../../../app/models/interfaces";
const config: AppConfig = module.require("../../../config/keys");

AWS.config.update({
  accessKeyId: config.AUDIO_BUCKET.access_key_id,
  secretAccessKey: config.AUDIO_BUCKET.secret_access_key,
  region: config.IMAGE_BUCKET.region,
  signatureVersion: "v4"
});

export class Audio extends AbstractMedia {
  constructor() {
    super();
  }

  async getPresignedUrl(data: IUploadFileRequest): Promise<Result<SignedUrl>> {
    console.log("audio class is called");
    let signedUrls: SignedUrl = {
      presignedUrl: [],
      action: data.action
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
          if (!AcceptedMedias[fileExtension]) {
            return Result.fail<PresignedUrl[]>(
              400,
              `${fileExtension} is not allowed.`
            );
          }
          theMap[item.file] = `${data.uploader}/audios/${
            UPLOADOPERATIONS[data.action]
          }/${uuid()}.${fileExtension}`;
          return theMap;
        },
        {}
      );
      try {
        for (let item in filesMap) {
          const params = {
            Bucket: config.AUDIO_BUCKET.bucket,
            Key: filesMap[item],
            Expires: 30 * 60,
            ContentType: data.files[0].file_type
          };
          const options = {
            signatureVersion: "v4",
            region: config.AUDIO_BUCKET.region,
            endpoint: config.AUDIO_BUCKET.accelerate_endpoint,
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
        console.log(signedUrls);
        return Result.ok<SignedUrl>(200, signedUrls);
      } catch (err) {
        throw new Error("Internal server error occured");
      }
    }
    return Result.fail<SignedUrl>(400, "No file uploaded.");
  }
}

import {
  IUploadFileRequest,
  UPLOADOPERATIONS,
  IFileMetaData,
  PresignedUrl,
} from "./../../uploadservice/Helper/Upload";
import { AbstractMedia } from "../Uploader";
import * as AWS from "aws-sdk";
import request from "request";
import { AppConfig } from "../../../app/models/interfaces/custom/AppConfig";
import { SignedUrl } from "../../uploadservice/Helper/Upload";
import { Result } from "../../Result";
import { ObjectKeyString, AcceptedImageExt } from "../../lib";
import uuid = require("uuid");
import { ImageEditRequest } from "../../../app/models/interfaces";
const config: AppConfig = module.require("../../../config/keys");

AWS.config.update({
  accessKeyId: config.IMAGE_BUCKET.access_key_id,
  secretAccessKey: config.IMAGE_BUCKET.secret_access_key,
  region: config.IMAGE_BUCKET.region,
  signatureVersion: "v4",
});

export class Image extends AbstractMedia {
  constructor() {
    super();
  }

  async getThumbNailUrl(
    uploader: string,
    encodedImage: string
  ): Promise<Result<SignedUrl>> {
    let signedUrls: SignedUrl = {
      presignedUrl: [],
      component: UPLOADOPERATIONS.thumbnail,
    };

    let signedUrl: PresignedUrl = {
      file: "",
      url: "",
      key: "",
    };

    const key = `${uploader}/images/thumbnail/${uuid()}.png`;
    try {
      const params = {
        Bucket: config.APP_BUCKET.bucket,
        Key: key,
        Body: encodedImage,
        ContentEncoding: "base64",
        ContentType: "image/png",
      };
      const options = {
        signatureVersion: "v4",
        region: config.APP_BUCKET.region, // same as your bucket
      };

      const client: AWS.S3 = new AWS.S3(options);
      const { Location, Key } = await client.upload(params).promise();

      signedUrl = {
        file: "none",
        url: Location,
        key: Key,
      };
      signedUrls.presignedUrl = [...signedUrls.presignedUrl, signedUrl];
      return Result.ok<SignedUrl>(200, signedUrls);
    } catch (err) {
      throw new Error("Internal server error occured");
    }
  }

  async getPresignedUrl(data: IUploadFileRequest): Promise<Result<SignedUrl>> {
    let signedUrls: SignedUrl = {
      presignedUrl: [],
      component: data.action,
    };
    let signedUrl: PresignedUrl = {
      file: "",
      url: "",
      key: "",
    };

    if (data.files) {
      const filesMap: ObjectKeyString = data.files.reduce(
        (theMap: any, item: IFileMetaData) => {
          let fileExtension = item.file.split(".").pop() || "";
          fileExtension = fileExtension.toLowerCase();
          if (!AcceptedImageExt[fileExtension]) {
            return Result.fail<PresignedUrl[]>(
              400,
              `${fileExtension} is not allowed.`
            );
          }
          theMap[item.file] = `${data.uploader}/images/${
            UPLOADOPERATIONS[data.action]
          }/${uuid()}.${fileExtension}`;
          return theMap;
        },
        {}
      );
      try {
        for (let item in filesMap) {
          const file: IFileMetaData = data.files.filter(
            (x) => x.file === item
          )[0];
          const params = {
            Bucket: config.IMAGE_BUCKET.bucket,
            Key: filesMap[item],
            Expires: 30 * 60,
            ContentType: file.file_type,
          };
          const options = {
            signatureVersion: "v4",
            region: config.IMAGE_BUCKET.region,
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
            key: filesMap[item],
          };
          signedUrls.presignedUrl = [...signedUrls.presignedUrl, signedUrl];
        }
        return Result.ok<SignedUrl>(200, signedUrls);
      } catch (err) {
        throw new Error("Internal server error occured");
      }
    }
    return Result.fail<SignedUrl>(400, "No file uploaded.");
  }
}

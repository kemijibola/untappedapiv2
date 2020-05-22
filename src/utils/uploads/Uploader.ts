import { Result } from "../Result";
import { SignedUrl, IUploadFileRequest } from "../uploadservice/Helper/Upload";
import { ImageEditRequest } from "../../app/models/interfaces";

export abstract class AbstractMedia {
  abstract getPresignedUrl(
    data: IUploadFileRequest
  ): Promise<Result<SignedUrl>>;
  abstract getThumbNailUrl(
    uploader: string,
    encodedImage: string
  ): Promise<Result<SignedUrl>>;
}

export class Uploader {
  constructor(public media: AbstractMedia) {}

  static init(media: AbstractMedia): Uploader {
    return new Uploader(media);
  }

  async getPresignedUrls(
    filesToUpload: IUploadFileRequest
  ): Promise<Result<SignedUrl>> {
    return await this.media.getPresignedUrl(filesToUpload);
  }

  async getThumbnailUrl(
    uploader: string,
    encoded: string
  ): Promise<Result<SignedUrl>> {
    return await this.media.getThumbNailUrl(uploader, encoded);
  }
}

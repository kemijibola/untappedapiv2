import { Result } from "../Result";
import { SignedUrl, IUploadFileRequest } from "../uploadservice/Helper/Upload";
import { ImageEditRequest } from "../../app/models/interfaces";

export abstract class AbstractMedia {
  abstract getPresignedUrl(
    data: IUploadFileRequest
  ): Promise<Result<SignedUrl>>;
  abstract fetchObjectFromCloudFormation(
    key: string,
    editParams: ImageEditRequest
  ): string;
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

  fetchObject(key: string, editParams: ImageEditRequest): string {
    return this.media.fetchObjectFromCloudFormation(key, editParams);
  }
}

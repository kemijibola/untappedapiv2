import { PresignedUrl, IUploadFileRequest, SignedUrl } from "./Helper/Upload";
import { Result } from "../Result";

export interface Storage {
  putObject(files: IUploadFileRequest): Promise<Result<SignedUrl>>;
  putThumbNail(
    uploader: string,
    encodedImage: string
  ): Promise<Result<SignedUrl>>;
  // getPresignedUrls(keys: string[]): Promise<string[]>;
}

export class FileUpload {
  constructor(public storage: Storage) {}

  static uploader(storage: Storage): FileUpload {
    return new FileUpload(storage);
  }

  async getPresignedUrls(
    filesToUpload: IUploadFileRequest
  ): Promise<Result<SignedUrl>> {
    return await this.storage.putObject(filesToUpload);
  }

  async getThumbnailUrl(
    uploader: string,
    encoderImage: string
  ): Promise<Result<SignedUrl>> {
    return await this.storage.putThumbNail(uploader, encoderImage);
  }

  // async deleteObject(key: string) {}

  // async getClientPresignedUrls(keys: string[]): Promise<string[]> {
  //   // const urls = await this.storage.g;
  // }
}

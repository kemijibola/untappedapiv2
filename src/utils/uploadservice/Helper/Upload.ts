import { IUser, MediaType } from "../../../app/models/interfaces";
import { ObjectKeyString } from "../../lib";

export enum UPLOADOPERATIONS {
  profileimage = "profileimage",
  portfolio = "portfolio",
  contestentry = "contestentry",
  contestbanner = "contestbanner",
  bannerimage = "bannerimage",
  thumbnail = "thumbnail",
  default = "default",
}
export interface IFileMetaData {
  file: string;
  file_type: string;
}

export interface SignedUrl {
  component: UPLOADOPERATIONS;
  presignedUrl: PresignedUrl[];
}
export interface PresignedUrl {
  file: string;
  url: string;
  key: string;
}

export interface IUploadFileRequest {
  mediaType: string;
  action: UPLOADOPERATIONS;
  files: IFileMetaData[];
  uploader: IUser["_id"];
}

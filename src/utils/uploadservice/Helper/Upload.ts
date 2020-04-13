import { IUser, MediaType } from "../../../app/models/interfaces";
import { ObjectKeyString } from "../../lib";

export enum UPLOADOPERATIONS {
  ProfileImage = "ProfileImage",
  Portfolio = "Portfolio",
  Entries = "Entries",
  ContestBanner = "ContestBanner",
  BannerImage = "BannerImage",
  Default = "Default"
}
export interface IFileMetaData {
  file: string;
  file_type: string;
}

export interface SignedUrl {
  action: UPLOADOPERATIONS;
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

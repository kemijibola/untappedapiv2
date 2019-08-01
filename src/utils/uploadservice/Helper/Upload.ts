import { IUser } from '../../../app/models/interfaces';
import { ObjectKeyString } from '../../lib';

export enum UPLOADOPERATIONS {
  ProfileImage = 'ProfileImage',
  Portfolio = 'Portfolio',
  Entries = 'Entries',
  ContestBanner = 'ContestBanner'
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
  action: UPLOADOPERATIONS;
  files: IFileMetaData[];
  uploader: IUser['_id'];
}

import mongoose from "mongoose";
import { ITimeStamp } from "./Timestamp";
import { IUser } from "./User";
import { IAppSpec } from "./AppSpec";

export interface ImageEditRequest {
  edits: {
    resize: Resize;
  };
  grayscale: boolean;
  flip: boolean;
  flop: boolean;
  negate: boolean;
  flatten: boolean;
  normalise: boolean;
  smartCrop: SmartCrop;
}

export enum ImageFit {
  disabled = "disabled",
  cover = "cover",
  contain = "contain",
  fill = "fill",
  inside = "inside",
  outside = "outside",
}
interface Resize {
  width: number;
  height: number;
  fit?: ImageFit;
}

interface SmartCrop {
  faceIndex: number;
  padding: number;
}

export enum MediaUploadType {
  single = "single",
  multiple = "multiple",
  all = "all",
}
export enum MediaType {
  audio = "audio",
  video = "video",
  image = "image",
}
export interface IMediaItem {
  _id?: string;
  path: string;
  likedBy?: IUser["fullName"][];
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  isApproved?: boolean;
}
export interface TalentMedia {
  user: string;
  medias: IMedia[];
}
export interface IMedia extends ITimeStamp, IAppSpec, mongoose.Document {
  title: string;
  shortDescription: string;
  user: IUser["_id"];
  items: IMediaItem[];
  albumCover?: string;
  uploadType: MediaUploadType;
  mediaType: MediaType;
  activityCount: number;
  isDeleted: boolean;
}

export interface IAudio extends IMedia {}
export interface IVideo extends IMedia {}
export interface IImage extends IMedia {}

export interface AudioPreview extends MediaPreview {}
export interface VideoPreview extends MediaPreview {}
export interface ImagePreview extends MediaPreview {}

export interface MediaPreview {
  _id: string;
  title: string;
  mediaType: string;
  uploadType: string;
  defaultMediaPath: string;
  shortDescription: string;
  itemCount: number;
}

export interface AudioPortfolioPreview extends TalentPortfolioPreview {}
export interface VideoPortfolioPreview extends TalentPortfolioPreview {}
export interface ImagePortfolioPreview extends TalentPortfolioPreview {}

export interface TalentPortfolioPreview {
  _id: string;
  mediaType: string;
  talent: string;
  aliasName: string;
  uploadType: string;
  albumCoverKey: string;
  defaultImageKey: string;
  mediaDescription: string;
  items: IMediaItem[];
  mediaTitle: string;
  itemsCount: number;
  dateCreated: Date;
}

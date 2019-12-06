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
  outside = "outside"
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
  all = "all"
}
export enum MediaType {
  audio = "audio",
  video = "video",
  image = "image"
}
export interface IMediaItem {
  index: number;
  path: string;
  likes: IUser["fullName"][];
}
export interface IMedia extends ITimeStamp, IAppSpec, mongoose.Document {
  title: string;
  shortDescription: string;
  user: IUser["_id"];
  items: IMediaItem[];
  albumCover?: string;
  uploadType: MediaUploadType;
  isApproved: boolean;
  watchCount: number;
  playCount: number;
  viewCount: number;
  isDeleted: boolean;
}

export interface IAudio extends IMedia {
  playCount: number;
}
export interface IVideo extends IMedia {
  watchCount: number;
}
export interface IImage extends IMedia {
  viewCount: number;
}

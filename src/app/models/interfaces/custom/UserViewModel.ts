import { IMedia } from "../Media";

export interface Talent extends UserViewModel {
  stageName: string;
  tapCount: number;
  audios: IMedia[];
  videos: IMedia[];
  images: IMedia[];
  generalUploads: IMedia[];
}

export interface Professional extends UserViewModel {
  businessName: string;
  bannerPhoto: string;
  contests: CreatedContest[];
}

export interface UserViewModel {
  fullName: string;
  displayPhoto: string;
  displayName: string;
  shortDescription: string;
  location: string;
}

export enum AppUsers {
  Talent = "Talent",
  Professional = "Professional",
  Audience = "Audience"
}

export interface CreatedContest {
  _id: string;
  banner: string;
  title: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

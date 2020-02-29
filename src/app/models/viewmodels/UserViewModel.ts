import {
  IUserAccountStatus,
  IMedia,
  IUser,
  AccountStatus,
  IUserType,
  ICategory
} from "../interfaces";

export interface UserViewModel {
  _id?: string;
  email: string;
  fullName: string;
  profileImagePath?: string;
  isEmailConfirmed: boolean;
  isPhoneConfirmed: boolean;
  isProfileCompleted: boolean;
  generalNotification: boolean;
  emailNotification: boolean;
  profileVisibility: boolean;
  loginCount: number;
  status: [IUserAccountStatus];
  roles: string[];
  lastLogin: Date;
  createdAt: Date;
}

export interface Talent extends UserViewModel {
  location: string;
  stageName: string;
  tapCount: number;
  audios: IMedia[];
  videos: IMedia[];
  images: IMedia[];
  generalUploads: IMedia[];
}

export interface Professional extends UserListViewModel {
  location: string;
  businessName: string;
  bannerPhoto: string;
  contests: CreatedContest[];
}

export interface UserListViewModel {
  user: IUser["_id"];
  userType: IUserType["_id"];
  displayPhoto: string;
  categories?: ICategory["_id"][];
  displayName: string;
  tapCount: number;
  shortDescription?: string;
  createdAt: Date;
  contestCount: number;
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

export interface UserListRequest {
  userType: string;
  isEmailConfirmed: boolean;
  isProfileCompleted: boolean;
  status: AccountStatus;
}

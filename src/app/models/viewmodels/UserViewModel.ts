import { CategoryTypeWithCategory } from "./../interfaces/UserFilterCategory";
import {
  IUserAccountStatus,
  IMedia,
  IUser,
  AccountStatus,
  IUserType,
  ReportType,
  ICategoryType,
  IUserSocialMedia,
} from "../interfaces";
import { IUserContestListAnalysis } from "../interfaces/custom/ContestList";

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

export interface Talent extends UserListViewModel {
  // location: string;
  stageName?: string;
  tapCount: number;
  tappedBy: string[];
  // audios: IMedia[]
  // videos: IMedia[];
  // images: IMedia[];
  // generalUploads: IMedia[];
}

export interface Professional extends UserListViewModel {
  // location: string;
  businessName?: string;
  bannerPhoto?: string;
  contestCount: number;
  userSocials?: IUserSocialMedia[];
  contests?: IUserContestListAnalysis[];
}

export interface UserListViewModel {
  user: string;
  userType: IUserType["_id"];
  displayPhoto: string;
  location?: string;
  categoryTypes?: CategoryTypeWithCategory[];
  displayName: string;
  shortDescription?: string;
  dateJoined?: Date;
}

export enum AppUsers {
  Talent = "Talent",
  Professional = "Professional",
  Audience = "Audience",
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
  userType?: string;
  isEmailConfirmed?: boolean;
  isProfileCompleted?: boolean;
  status?: AccountStatus;
}

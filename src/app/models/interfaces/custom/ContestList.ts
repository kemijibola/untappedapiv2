import { IContest } from "../Contest";
import { IContestEntry } from "../ContestEntry";

export interface IContestList {
  _id: IContest["_id"];
  title: string;
  entryCount: number;
  viewCount: number;
  bannerImage: string;
  endDate: Date;
}

export interface IUserContestList {
  _id: string;
  title: string;
  entryCount: number;
  bannerImage: string;
}

export interface IUserContestListAnalysis {
  contestId: string;
  contestTitle: string;
  contestBanner: string;
  contestViewCount: number;
  contestLikedByCount: number;
  commentCount: number;
  entryCount: number;
}

export interface IContestEntryPreview {
  user: any;
  contest: string;
  likedBy: string[];
  title: string;
  additionalInfo: string;
  contestantCode: string;
  entry: string;
  entryLikeCount: number;
  entryCommentCount: number;
}

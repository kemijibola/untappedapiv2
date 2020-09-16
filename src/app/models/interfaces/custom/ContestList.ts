import { IContest } from "../Contest";
import { IContestEntry } from "../ContestEntry";

export interface IContestContestant {
  entryId: string;
  contestant: string;
  contestantName: string;
  contestantPhoto: string;
  contestantEmail?: string;
  contestantCode: string;
  contestantTotalVote: number;
  position: string;
  prizeRedeemed: boolean;
}

export interface ContestVoteResult {
  contestId: string;
  contestPhoto: string;
  contestHasEnded: boolean;
  contestTitle: string;
  contestStartDate: Date;
  contestDuration: string;
  contestTotalVote: number;
  contestTotalValidVote: number;
  contestTotalInvalidVote: number;
  entries: IContestContestant[];
}
export interface IContestList {
  _id: IContest["_id"];
  title: string;
  entryCount: number;
  viewCount: number;
  bannerImage: string;
  endDate: Date;
}

export interface CompetitionParticipant {
  sn: number;
  id: IContestEntry["_id"];
  competition_code: string;
  contestant_code: string;
  entry: string;
  entry_date: Date;
}

export interface AllContestViewModel {
  _id: IContest["_id"];
  code: string;
  title: string;
  totalEntries: number;
  totalVotes: number;
  createdDate: Date;
  paymentStatus: string;
  contestStartDate: Date;
  contestEndDate: Date;
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

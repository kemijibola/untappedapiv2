import { IContest } from "../Contest";

export interface IContestList {
  _id: IContest["_id"];
  title: string;
  entryCount: number;
  viewCount: number;
  bannerImage: string;
  startDate: Date;
}

export interface IUserContestList {
  _id: string;
  title: string;
  entryCount: number;
  bannerImage: string;
}

import mongoose from "mongoose";
import { IUser } from "./User";
import { IContest } from "./Contest";
import { ITimeStamp, IApproval } from "./Timestamp";
import { IAppSpec } from "./AppSpec";

export interface EvaluationRating {
  evaluation: string;
  rating: number;
}

export interface JudgeEvaluation {
  judgeName: string;
  judgeEmail: string;
  evaluations: EvaluationRating[];
  comment: string;
  dateAdded: Date;
}
export interface IContestEntry
  extends ITimeStamp,
    IApproval,
    IAppSpec,
    mongoose.Document {
  user: IUser["_id"];
  contest: IContest["_id"];
  likedBy: string[];
  title: string;
  additionalInfo: string;
  contestantCode: string;
  entry: string;
  position: EntryPosition;
  prizeRedeemed: boolean;
  // judgeEvaluations: JudgeEvaluation[];
}

export enum EligibilityStatus {
  entered = "entered",
  noteligible = "noteligible",
  eligible = "eligible",
  default = "default",
}

export interface CreateEntryPosition {
  contestId: string;
  positions: ContestPosition[];
}

export interface ContestPosition {
  entryId: string;
  user: string;
  position: string;
}
export interface ContestEligibilityData {
  status: boolean;
  eligibility: EligibilityStatus;
  message?: string;
}

export enum EntryPosition {
  firstplace = "firstplace",
  secondplace = "secondplace",
  thirdplace = "thirdplace",
  fourthplace = "fourthplace",
  fifthplace = "fifthplace",
  disqualified = "disqualified",
  participant = "participant",
}

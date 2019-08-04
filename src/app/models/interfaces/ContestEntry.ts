import mongoose from 'mongoose';
import { IUser } from './User';
import { IContest } from './Contest';
import { ITimeStamp } from './Timestamp';
import { IAppSpec } from './AppSpec';

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
export interface IContestEntry extends ITimeStamp, IAppSpec, mongoose.Document {
  user: IUser['_id'];
  contest: IContest['_id'];
  submissionPath: string;
  isApproved: boolean;
  judgeEvaluations: JudgeEvaluation[];
}

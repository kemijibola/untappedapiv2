import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IContest } from '../../models/interfaces';

export enum ContestType {
  Online = 'Online',
  Offline = 'Offline'
}
const evaluationSchema: Schema = new Schema({
  name: { type: String }
});

const redeemableSchema: Schema = new Schema({
  prizeType: {
    type: Schema.Types.ObjectId,
    ref: 'PrizeType',
    required: true
  },
  winners: [{ type: Number, required: true }]
});

const contestSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    information: { type: String, required: true },
    bannerImage: { type: String },
    eligibleCategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    eligibilityInfo: { type: String },
    submissionRules: { type: String },
    startDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    redeemable: redeemableSchema,
    endDate: { type: Date, required: true },
    contestType: { type: ContestType },
    maxContestant: { type: Number },
    grandFinaleDate: { type: Date },
    grandFinaleLocation: { type: String },
    evaluations: [{ type: String }],
    createdBy: { type: Schema.Types.ObjectId, required: true }
  },
  { timestamps: true }
);
export const ContestSchema = mongooseConnection.model<IContest>(
  'Contest',
  contestSchema
);

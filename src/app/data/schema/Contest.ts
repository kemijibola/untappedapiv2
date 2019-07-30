import MongodataAccess = require('../MongodataAccess');
import { Schema } from 'mongoose';
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IContest, PaymentStatus } from '../../models/interfaces';
import { socialMediaSchema } from './Talent';

export enum ContestType {
  Online = 'Online',
  OnlineOffline = 'OnlineOffline'
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
  prizes: [{ type: Schema.Types.Mixed, required: true }]
});

const judgeSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  profile: { type: String, required: true },
  socialMedias: [socialMediaSchema],
  profession: [{ type: String, required: true }],
  judgeProfileImage: { type: String },
  yearsOfExperience: { type: Number, default: 0 }
});

const contestSchema: Schema = new Schema(
  {
    // TODO:: add trim to properties that might have extra spaces
    title: { type: String, required: true, trim: true },
    information: { type: String, required: true },
    bannerImage: { type: String },
    eligibleCategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    eligibilityInfo: { type: String },
    submissionRules: { type: String },
    startDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    redeemable: [{ type: redeemableSchema, required: true }],
    endDate: { type: Date, required: true },
    contestType: { type: ContestType },
    maxContestant: { type: Number },
    grandFinaleDate: { type: Date },
    grandFinaleLocation: { type: String },
    evaluations: [{ type: String }],
    judges: [{ type: judgeSchema }],
    paymentStatus: { type: PaymentStatus, default: PaymentStatus.UnPaid },
    createdBy: { type: Schema.Types.ObjectId, required: true },
    application: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    }
  },
  { timestamps: true }
);
export const ContestSchema = mongooseConnection.model<IContest>(
  'Contest',
  contestSchema
);

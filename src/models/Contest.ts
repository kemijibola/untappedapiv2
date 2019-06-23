import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { Contest } from '../interfaces/models';

const redeemableSchema = new Schema({
  prizeType: { type: Schema.Types.ObjectId, ref: 'PrizeType', required: true },
  winners: [{ type: Number, required: true }]
});

const evaluationSchema = new Schema({
  name: { type: String }
});

const contestSchema = new Schema(
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
    maxContestant: { type: Number },
    grandFinaleDate: { type: Date },
    grandFinaleLocation: { type: String },
    evaluations: [evaluationSchema],
    createdBy: { type: Schema.Types.ObjectId, required: true }
  },
  { timestamps: true }
);

const Contest = mongoose.model<Contest>('Contest', contestSchema);
export default Contest;

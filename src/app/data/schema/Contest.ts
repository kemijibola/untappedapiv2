import MongodataAccess = require('../MongodataAccess');
const mongoose = MongodataAccess.mongooseInstance;
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IContest } from '../../models/interfaces';

class ContestSchema {
  static get schema() {
    const evaluationSchema = mongoose.Schema({
      name: { type: String }
    });
    const redeemableSchema = mongoose.Schema({
      prizeType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PrizeType',
        required: true
      },
      winners: [{ type: Number, required: true }]
    });

    const schema = mongoose.Schema(
      {
        title: { type: String, required: true },
        information: { type: String, required: true },
        bannerImage: { type: String },
        eligibleCategories: [
          { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
        ],
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
        createdBy: { type: mongoose.Schema.Types.ObjectId, required: true }
      },
      { timestamps: true }
    );
    return schema;
  }
}

const schema = mongooseConnection.model<IContest>(
  'Contest',
  ContestSchema.schema
);
export = schema;

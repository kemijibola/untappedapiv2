import MongodataAccess = require("../MongodataAccess");
import { Schema } from "mongoose";
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IContestEntry, EntryPosition } from "../../models/interfaces";

const evaluationRatingSchema: Schema = new Schema({
  evaluation: { type: String, required: true },
  rating: { type: Number, default: 0 },
});

const judgeEvaluationSchema: Schema = new Schema({
  judgeName: { type: String, required: true },
  judgeEmail: { type: String, required: true },
  evaluations: [{ type: evaluationRatingSchema, required: true }],
  comment: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
});

const contestEntrySchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contest: {
      type: Schema.Types.ObjectId,
      ref: "Contest",
      required: true,
    },
    likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    title: { type: String, required: true },
    additionalInfo: { type: String },
    entry: { type: String, required: true },
    contestantCode: { type: String, required: true },
    position: { type: EntryPosition, default: EntryPosition.participant },
    prizeRedeemed: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
    approvedDate: { type: Date },
    application: {
      type: Schema.Types.ObjectId,
      ref: "Application",
    },
  },
  { timestamps: true }
);

export const ContestEntrySchema = mongooseConnection.model<IContestEntry>(
  "ContestEntry",
  contestEntrySchema
);

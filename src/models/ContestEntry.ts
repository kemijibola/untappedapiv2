import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { ContestEntry } from '../interfaces/models';

const contestEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    contest: { type: Schema.Types.ObjectId, ref: 'Contest', required: true },
    submissionPath: { type: String, required: true }
  },
  { timestamps: true }
);

const ContestEntry = mongoose.model<ContestEntry>(
  'ContestEntry',
  contestEntrySchema
);
export default ContestEntry;

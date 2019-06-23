import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { PrizeType } from '../interfaces/models';

const prizeTypeSchema = new Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true }
);

const PrizeType = mongoose.model<PrizeType>('PrizeType', prizeTypeSchema);
export default PrizeType;

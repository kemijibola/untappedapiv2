import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { Evaluation } from '../interfaces/models';

const evaluationSchema = new Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true }
);

const Evaluation = mongoose.model<Evaluation>('Evaluation', evaluationSchema);
export default Evaluation;

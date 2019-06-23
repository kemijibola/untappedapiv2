import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { Portfolio } from '../interfaces/models';

const collectionSchema = new Schema({
  path: { type: String, required: true },
  likes: { type: Number, required: true, default: 0 }
});

const portfolioSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    mediaType: { type: String, required: true },
    uploadType: { type: String, required: true },
    items: [collectionSchema]
  },
  { timestamps: true }
);


const Portfolio = mongoose.model<Portfolio>('Portfolio', portfolioSchema);
export default Portfolio;
